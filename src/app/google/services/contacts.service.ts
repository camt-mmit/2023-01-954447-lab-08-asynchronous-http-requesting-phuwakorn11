import { Injectable, inject } from '@angular/core';
import { ConnectionsList, ConnectionsListParams, parseConnectionsList } from '../models';
import { Observable, map, switchMap } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';


const url =  'https://people.googleapis.com/v1/people/me/connections' as const;
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

 /*
 create(eventFormData: EventFormData): Observable<>{
    return this.tokenService.getAuthorizationHeader().pipe(
      switchMap((authorizationHeader) => this.http.post<EventResource>(url,eventFormData,{
        headers: {
          Authorization: authorizationHeader,
        },
      })),
      map(parseEventResource),
    );
  }
 */

}
