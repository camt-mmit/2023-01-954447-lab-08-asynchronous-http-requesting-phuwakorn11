import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesService } from '../../services/species.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SpecieViewComponent } from "../specie-view/specie-view.component";

@Component({
    selector: 'app-specie-view-page',
    standalone: true,
    templateUrl: './specie-view-page.component.html',
    styleUrls: ['./specie-view-page.component.scss'],
    imports: [CommonModule, SpecieViewComponent]
})
export class SpecieViewPageComponent {
  private readonly speciesService = inject(SpeciesService);
  private readonly route = inject(ActivatedRoute);

  protected readonly data$ = this.route.params.pipe(
    switchMap((params) => this.speciesService.get(params['id']))
  );
}
