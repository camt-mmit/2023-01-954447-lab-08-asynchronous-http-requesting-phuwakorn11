import { List, Person, RawList, RawPerson, RawResource, Resource, planets, rawPlanets, rawSpecies, species } from "./models";

export function parseResource(rawResource: RawResource): Resource {
  return {
    ...rawResource,
    created: new Date(rawResource.created),
    edited: new Date(rawResource.edited),
    url: new URL(rawResource.url),
  };
}

export function parseList(rawList: RawList<RawResource>): List<RawResource>{
  return {
    ...rawList,
    previous: rawList.previous? new URL(rawList.previous): null,
    next: rawList.next? new URL(rawList.next): null,
  };
}

export function parsePerson(rawPerson: RawPerson): Person {
  return{
    ...rawPerson,
    ...parseResource(rawPerson),
    homeworld: new URL(rawPerson.homeworld),
    films: rawPerson.films.map((url) => new URL(url)),
    species: rawPerson.species.map((url) => new URL(url)),
    starships: rawPerson.starships.map((url) => new URL(url)),
    vehicles: rawPerson.vehicles.map((url) => new URL(url)),
  };
}

export function parsePeopleList(rawPeopleList: RawList<RawPerson>): List<Person>{
  return {
    ...parseList(rawPeopleList),
    results: rawPeopleList.results.map((result) => parsePerson(result)),
  };
}


export function parseSpecies(rawSpecies: rawSpecies): species {
  return{
    ...rawSpecies,
    ...parseResource(rawSpecies),
    homeworld: rawSpecies.homeworld? new URL(rawSpecies.homeworld): null,
    films: rawSpecies.films,


  };
}

export function parseSpeciesList(rawSpeciesList: RawList<rawSpecies>): List<species>{
  return {
    ...parseList(rawSpeciesList),
    results: rawSpeciesList.results.map((result) => parseSpecies(result)),
  };
}



export function parsePlanet(rawPlanet: rawPlanets): planets {
  return{
    ...rawPlanet,
    ...parseResource(rawPlanet),
    films: rawPlanet.films.map((url) => new URL(url)),
    residents: rawPlanet.films.map((url) => new URL(url)),

  };
}

export function parsePlanetList(rawPlanetList: RawList<rawPlanets>): List<planets>{
  return {
    ...parseList(rawPlanetList),
    results: rawPlanetList.results.map((result) => parsePlanet(result)),
  };
}
