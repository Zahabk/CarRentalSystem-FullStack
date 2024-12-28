import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AgentNavBarComponent } from '../agent-nav-bar/agent-nav-bar.component';

@Component({
  selector: 'app-register-car',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent {

}
