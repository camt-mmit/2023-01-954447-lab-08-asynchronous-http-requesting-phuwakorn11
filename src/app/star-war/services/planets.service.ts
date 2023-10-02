import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { List, RawList, SearchData, planets, rawPlanets } from '../models';
import { Observable, map } from 'rxjs';
import { parsePlanet, parsePlanetList } from '../helper';


const url = 'https://swapi.dev/api/planets' as const;
@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private readonly http = inject(HttpClient);
  queryParams: any;

  getAll(params?: SearchData): Observable<List<planets>>{
    return (
    this.http
    .get<RawList<rawPlanets>>(url,{params: params})
    .pipe(map(parsePlanetList))
    );
  }

  get(id:string): Observable<planets>{
    return(
      this.http.get<rawPlanets>(`${url}/${id}`).pipe(map(parsePlanet)));
  }
}
