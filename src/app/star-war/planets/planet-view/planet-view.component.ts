import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { planets } from '../../models';

@Component({
  selector: 'app-planet-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-view.component.html',
  styleUrls: ['./planet-view.component.scss']
})
export class PlanetViewComponent {
  @Input({ required: true}) data!: planets;
}
