import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-require-token-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './require-token-page.component.html',
  styleUrls: ['./require-token-page.component.scss']
})
export class RequireTokenPageComponent {
   private readonly tokenService = inject(TokenService);

   protected readonly tokenReady$ = this.tokenService.tokenReady$;
   protected async login(): Promise<void>{
    const url = await this.tokenService.getAuthorizationURL();
    location.href = `${url}`;
   }
}
