import { Injectable, inject } from '@angular/core';
import { ConnectionsList, ConnectionsListParams,Person, PersonFormData, parseConnectionsList, parsePerson } from '../models';
import { Observable, map, switchMap } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';


const url =  'https://people.googleapis.com/v1/people/me/connections' as const;
const createUrl = 'https://people.googleapis.com/v1/people:createContact' as const;
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly tokenService = inject(TokenService);
  private readonly http = inject(HttpClient);

  getAll(params?: ConnectionsListParams): Observable<ConnectionsList>{
    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) =>
      this.http.get<ConnectionsList>(url,{
        headers:{
            Authorization: authorizationHeader,
        },
        params,
  })
      ),
      map(parseConnectionsList)
    );
  }


 create(contactFormData: PersonFormData): Observable<Person>{
    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => this.http.post<Person>(createUrl,contactFormData,{
        headers: {
          Authorization: authorizationHeader,
        },
      })),
      map(parsePerson),
    );
  }


}
