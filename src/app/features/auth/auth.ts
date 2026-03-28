import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'authCore';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  _authService = inject(AuthService);
   
 
}
