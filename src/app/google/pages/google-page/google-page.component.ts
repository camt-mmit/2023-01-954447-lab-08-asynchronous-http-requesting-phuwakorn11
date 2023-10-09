import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { RequireTokenPageComponent } from '../require-token-page/require-token-page.component';

@Component({
  selector: 'app-google-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RequireTokenPageComponent,RouterLink],
  templateUrl: './google-page.component.html',
  styleUrls: ['./google-page.component.scss']
})
export class GooglePageComponent {
  private readonly tokenService = inject(TokenService);

  protected readonly authUrl$ = this.tokenService.getAuthorizationURL();
}
