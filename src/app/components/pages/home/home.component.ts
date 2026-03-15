import { Component } from '@angular/core';
import { AboutHomeComponent } from './about-home/about-home.component';
import { PhilosophyHomeComponent } from './philosophy-home/philosophy-home.component';
import { TransformHomeComponent } from './transform-home/transform-home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HeroComponent } from './hero/hero.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutHomeComponent,
    TransformHomeComponent,
    PhilosophyHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
