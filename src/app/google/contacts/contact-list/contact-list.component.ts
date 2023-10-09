import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsList, displayEmailAddress, displayEventTimeRange, displayName, displayPhoneNumber, urlPhotos } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatListModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Input({required: true}) data!: ConnectionsList;
  protected readonly displayName = displayName;
  protected readonly urlPhotos = urlPhotos;
  protected readonly displayEmailAddress = displayEmailAddress;
  protected readonly displayPhoneNumber = displayPhoneNumber;

  protected readonly displayEventTimeRange = displayEventTimeRange;
}
