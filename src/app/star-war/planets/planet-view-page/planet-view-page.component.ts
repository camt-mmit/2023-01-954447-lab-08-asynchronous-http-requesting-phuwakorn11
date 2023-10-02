import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsService } from '../../services/planets.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PlanetViewComponent } from "../planet-view/planet-view.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-planet-view-page',
    standalone: true,
    templateUrl: './planet-view-page.component.html',
    styleUrls: ['./planet-view-page.component.scss'],
    imports: [CommonModule, PlanetViewComponent,ReactiveFormsModule]
})
export class PlanetViewPageComponent {
  private readonly planetsService = inject(PlanetsService);
  private readonly route = inject(ActivatedRoute);

  protected readonly data$ = this.route.params.pipe(
    switchMap((params) => this.planetsService.get(params['id']))
  );
}
