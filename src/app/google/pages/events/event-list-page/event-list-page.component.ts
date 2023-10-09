import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from 'src/app/google/services/events.service';
import { EventsListComponent } from 'src/app/google/events/events-list/events-list.component';
import { RouterLinkActive } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-event-list-page',
  standalone: true,
  imports: [CommonModule, EventsListComponent,RouterLinkActive,MatButtonModule,MatIconModule],
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})
export class EventListPageComponent {
  private readonly eventsService = inject(EventsService);

  protected readonly data$ = this.eventsService.getAll({
    singleEvents:true,
    orderBy: 'startTime',
    timeMin: new Date(
      Date.now()-30*24*60*60*1_000,
    ).toISOString(),
  });
}
