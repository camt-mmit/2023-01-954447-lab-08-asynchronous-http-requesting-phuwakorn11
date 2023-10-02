import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { List, RawList, SearchData, rawSpecies, species } from '../models';
import { Observable, map } from 'rxjs';
import { parseSpecies, parseSpeciesList } from '../helper';

const url = 'https://swapi.dev/api/species' as const;

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private readonly http = inject(HttpClient);
  queryParams: any;

  getAll(params?: SearchData): Observable<List<species>>{
    return (
    this.http
    .get<RawList<rawSpecies>>(url,{params: params})
    .pipe(map(parseSpeciesList))
    );
  }

  get(id:string): Observable<species>{
    return(
      this.http.get<rawSpecies>(`${url}/${id}`).pipe(map(parseSpecies)));
  }
}
