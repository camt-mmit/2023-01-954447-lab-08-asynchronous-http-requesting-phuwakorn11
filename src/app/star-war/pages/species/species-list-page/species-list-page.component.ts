import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesService } from 'src/app/star-war/services/species.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SearchData } from 'src/app/star-war/models';
import { SpeciesListComponent } from "../../../species/species-list/species-list.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-species-list-page',
    standalone: true,
    templateUrl: './species-list-page.component.html',
    styleUrls: ['./species-list-page.component.scss'],
    imports: [CommonModule, SpeciesListComponent,ReactiveFormsModule]
})
export class SpeciesListPageComponent {
  private readonly speciesService = inject(SpeciesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);


  protected readonly data$ = this.route.queryParams.pipe(
    switchMap((params) => this.speciesService.getAll(params).pipe(
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
