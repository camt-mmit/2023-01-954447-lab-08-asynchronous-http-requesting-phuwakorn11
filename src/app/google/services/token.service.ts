import { Injectable, inject } from '@angular/core';
import { AccessTokenNotFound, ConfigurationToken, SecurityTokenNotFound, StateData,TokenData } from '../models';
import { arrayBufferToBase64, randomString, sha256 } from '../models/utils';
import { Router } from '@angular/router';
import { Observable, catchError, defer, map, of, share, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const tokenUrl = 'https://oauth2.googleapis.com/token';
const stateDataKeyPrefix ='google-state' as const;
const tokenDataKeyName = 'google-token-data' as const;
const refreshTokenKeyName = 'google-refresh-token' as const;
const stateTtl =10*60*1000; // millsec
const latency = 10*1000; // millisec
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly config = inject(ConfigurationToken);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

    private async storeStateData(securityToken:string, statData:StateData): Promise<void>{
      const currentTime = Date.now();

      if(typeof statData.expiredAt === 'undefined'){
        statData.expiredAt = currentTime + stateTtl;
      }



      localStorage.setItem(`${stateDataKeyPrefix}-${securityToken}`, JSON.stringify(statData));

    }

    private async loadTokenData(): Promise<TokenData>{
      const currentTime = Date.now();
      const tokenData: TokenData | null = JSON.parse(localStorage.getItem(tokenDataKeyName) ?? 'null');
      if(tokenData === null || (typeof tokenData.expiredAt !== 'undefined' && tokenData.expiredAt < currentTime)){
        throw new AccessTokenNotFound();
      }
      return tokenData;
    }



    private async loadStateData(securityToken: string): Promise<StateData>{
      const currentTime = Date.now();
      const removedKeys: string[] = [];
      for(let i = 0;i < localStorage.length;i++){
        const key = localStorage.key(i) ?? '';
        if(key.startsWith(`${stateDataKeyPrefix}`)){
          const stateData: StateData = JSON.parse(localStorage.getItem(key) ?? 'null');
          if(typeof stateData.expiredAt !== 'undefined' && stateData.expiredAt < currentTime){
            removedKeys.push(key);
          }
        }

      }
      removedKeys.forEach((key) => localStorage.removeItem(key));

      const stateData: StateData  | null= JSON.parse(localStorage.getItem(`${stateDataKeyPrefix}-${securityToken}`) ?? 'null');
      if(stateData === null){
        throw new SecurityTokenNotFound(securityToken);
      }
      return stateData;
    }

  async getAuthorizationURL(): Promise<URL> {
    const code_verifier = randomString(54);
    const code_challenge = arrayBufferToBase64(await sha256(code_verifier), true);



    const url = new URL(authUrl);

    const securityToken = randomString(32);
    this.storeStateData(securityToken,{
      verifierCode: code_verifier,
      redirectUrl: this.router.url,

    });

    url.searchParams.set('state', securityToken);


    url.searchParams.set('client_id', this.config.client_id);
    url.searchParams.set('redirect_uri', this.config.redirect_uri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', this.config.scopes.join(' '));
    url.searchParams.set('code_challenge', code_challenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('prompt','consent');
    url.searchParams.set('access_type','offline');
    return url;
  }

private async storeTokenData(tokenData: TokenData):Promise<void>{
  const currentTime = Date.now();
  if(typeof tokenData.expiredAt === 'undefined'){
    tokenData.expiredAt = currentTime+tokenData.expires_in*1000-latency;
  }
const { refresh_token, ...access_token_data} = tokenData;

  if(typeof refresh_token !== 'undefined'){
    localStorage.setItem(refreshTokenKeyName, refresh_token);
  }
  localStorage.setItem(tokenDataKeyName, JSON.stringify(access_token_data));
}

private async loadRefreshToken(): Promise<string | null>{
  return localStorage.getItem(refreshTokenKeyName);
}

  exchangeCodeForToken(code: string, securityToken: string): Observable<StateData>{
    return defer(() => this.loadStateData(securityToken)).pipe(
      switchMap((stateData) =>
        this.http.post<TokenData>(tokenUrl,{
          client_id: this.config.client_id,
          client_secret: this.config.client_secret,
          code: code,
          code_verifier: stateData.verifierCode,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirect_uri,

      }).pipe(
        switchMap((tokenData) => this.storeTokenData(tokenData)),
        map(() => stateData),
      )
      ),
    );





  }

  private refreshTokenData(): Observable<TokenData | null>{
    return defer(() => this.loadRefreshToken()).pipe(
      switchMap((refresh_Token) => {
        if(refresh_Token === null){
          return of(null);
        }


        return this.http.post<TokenData>(
          tokenUrl,
          {
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            grant_type: 'refresh_token',
            refresh_token: refresh_Token,
          }).pipe(
            switchMap((tokenData) => this.storeTokenData(tokenData)),
            switchMap(() => this.loadTokenData())
        );
      }),
    );
  }

  private getTokenData(): Observable<TokenData>{
    return defer(() => this.loadTokenData()).pipe(
    catchError((err) => {
      if(err instanceof AccessTokenNotFound) {
        return this.refreshTokenData().pipe(
          switchMap((tokenData) => {
            if(tokenData === null){
              return throwError(() => err);
            }

            return of(tokenData);
          })
        )
      }else{
        return throwError(() => err)
      }
    }),
    );
  }


 getAccessToken(): Observable<string>{
  return this.getTokenData().pipe(
    map((tokenData) => tokenData.access_token),

  );
 }


 getAuthorizationHeader(): Observable<string>{
  return this.getTokenData().pipe(
    map((tokenData) => `${tokenData.token_type} ${tokenData.access_token}`),
  );
 }


 readonly tokenReady$ = this.getTokenData().pipe(
  map(() => 'ready' as const),
  catchError((err) => {
    console.error(err);

    return of('not-ready' as const);
  }),
  share(),
 );







}
