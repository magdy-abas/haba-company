import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-synergy-home',
  standalone: true,
  imports: [],
  templateUrl: './synergy-home.component.html',
  styleUrl: './synergy-home.component.scss',
})
export class SynergyHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('synergySection', { static: true })
  private synergySection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    backgroundImage: 'assets/images/card-gridline.two.png',
    titleFirstLine: 'عـــندما تتناغــــم هـــذه العناصر، يصــــــــبح ',
    titleSecondLine:
      '    النمــــــــــو نتيجــــــة… لا مجـــــــــهودًا إضافـــــيًا.',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        scrollTrigger: {
          trigger: this.synergySection.nativeElement,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .from('.synergy-home__inner', {
          opacity: 0,
          y: 24,
          duration: 0.9,
        })
        .from(
          '.synergy-home__line',
          {
            opacity: 0,
            y: 24,
            filter: 'blur(8px)',
            duration: 0.85,
            stagger: 0.14,
          },
          '-=0.45',
        );
    }, this.synergySection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
