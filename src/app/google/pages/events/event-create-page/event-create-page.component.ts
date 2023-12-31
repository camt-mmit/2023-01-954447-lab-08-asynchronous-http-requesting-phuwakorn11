import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventFormComponent } from 'src/app/google/events/event-form/event-form.component';
import { EventsService } from 'src/app/google/services/events.service';
import { EventFormData } from 'src/app/google/models';
import { take } from 'rxjs';

@Component({
  selector: 'app-event-create-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,EventFormComponent],
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss']
})
export class EventCreatePageComponent {
  private readonly eventsService = inject(EventsService);

  protected onSubmit(eventFormData: EventFormData): void{
    this.eventsService.create(eventFormData).pipe(
      take(1),
    ).subscribe(() => {
        history.back();
    });
  }
}
