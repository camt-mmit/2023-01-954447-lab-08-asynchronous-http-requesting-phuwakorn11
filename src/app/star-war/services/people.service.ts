import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { parsePeopleList, parsePerson } from '../helper';
import { List, Person, RawList, RawPerson, SearchData } from '../models';
import { Observable, map } from 'rxjs';

const url = 'https://swapi.dev/api/people' as const;
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly http = inject(HttpClient);
  queryParams: any;

  getAll(params?: SearchData): Observable<List<Person>>{
    return (
    this.http
    .get<RawList<RawPerson>>(url,{params: params})
    .pipe(map(parsePeopleList))
    );
  }

  get(id:string): Observable<Person>{
    return(
      this.http.get<RawPerson>(`${url}/${id}`).pipe(map(parsePerson)));
  }
}
