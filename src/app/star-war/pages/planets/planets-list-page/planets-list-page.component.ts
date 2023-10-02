import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsService } from 'src/app/star-war/services/planets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SearchData } from 'src/app/star-war/models';
import { PlanetListComponent } from "../../../planets/planet-list/planet-list.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-planets-list-page',
    standalone: true,
    templateUrl: './planets-list-page.component.html',
    styleUrls: ['./planets-list-page.component.scss'],
    imports: [CommonModule, PlanetListComponent,ReactiveFormsModule]
})
export class PlanetsListPageComponent {
  private readonly planetsService = inject(PlanetsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);


  protected readonly data$ = this.route.queryParams.pipe(
    switchMap((params) => this.planetsService.getAll(params).pipe(
      map((data) => ({
        params,
        data,
      })),
    ),
    ),
  );
  SpeciesService: any;
  protected doSearchDataChange(searchData: SearchData): void{
    this.router.navigate([],{
      replaceUrl: true,
      queryParams: searchData,
    });
  }
}
