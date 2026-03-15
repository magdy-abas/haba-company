import { Component } from '@angular/core';
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();
    }
  }

  startAnimation() {
    const tl = gsap.timeline();

    tl.from('.hero-title', {
      y: 80,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.4,
      ease: 'power3.out',
    })

      .from(
        '.hero-glow',
        {
          scale: 0.7,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        '-=1',
      )

      .from(
        '.hero-desc',
        {
          y: 40,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=.8',
      );
  }
}
