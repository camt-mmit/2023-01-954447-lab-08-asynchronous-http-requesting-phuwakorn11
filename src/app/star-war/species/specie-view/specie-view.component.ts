import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { species } from '../../models';

@Component({
  selector: 'app-specie-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specie-view.component.html',
  styleUrls: ['./specie-view.component.scss']
})
export class SpecieViewComponent {
  @Input({ required: true}) data!: species;
}
