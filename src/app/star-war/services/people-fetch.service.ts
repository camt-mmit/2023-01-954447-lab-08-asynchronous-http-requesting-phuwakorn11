import { Injectable } from '@angular/core';
import { List, Person } from '../models';
import { parsePeopleList } from '../helper';

const url = 'https://swapi.dev/api/people' as const;
@Injectable({
  providedIn: 'root'
})
export class PeopleFetchService {
  async getAll(): Promise<List<Person>>{
    return  parsePeopleList( await (await fetch(url)).json());
  }
}


