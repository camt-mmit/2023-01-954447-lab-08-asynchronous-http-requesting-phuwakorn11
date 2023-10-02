import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models';

@Component({
  selector: 'app-person-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent {
  @Input({ required: true}) data: Person | undefined;
}
