import { Component } from '@angular/core';
import { AboutHomeComponent } from './about-home/about-home.component';
import { DevelopHomeComponent } from './develop-home/develop-home.component';
import { PhilosophyHomeComponent } from './philosophy-home/philosophy-home.component';
import { SynergyHomeComponent } from './synergy-home/synergy-home.component';
import { TransformHomeComponent } from './transform-home/transform-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    HomeSliderComponent,
    AboutHomeComponent,
    TransformHomeComponent,
    PhilosophyHomeComponent,
    SynergyHomeComponent,
    DevelopHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
