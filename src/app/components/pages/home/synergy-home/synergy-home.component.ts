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
      const section = this.synergySection.nativeElement;
      const inner = section.querySelector('.synergy-home__inner');
      const title = section.querySelector('.synergy-home__title');
      const background = section.querySelector('.synergy-home__background');

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .from('.synergy-home__background', {
          opacity: 0,
          yPercent: 14,
          scale: 1.03,
          filter: 'blur(10px)',
          duration: 1.05,
        })
        .from(
          '.synergy-home__line',
          {
            opacity: 0,
            y: 24,
            filter: 'blur(7px)',
            duration: 0.8,
            stagger: 0.14,
          },
          '-=0.28',
        );

      ScrollTrigger.matchMedia({
        '(min-width: 769px)': () => {
          if (!inner || !title || !background) {
            return;
          }

          gsap.set([title, background], {
            clearProps: 'transform,filter,opacity',
          });

          const zoomTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.45,
              invalidateOnRefresh: true,
            },
          });

          zoomTimeline
            .to(
              title,
              {
                scale: 12.5,
                yPercent: -12,
                filter: 'blur(3.4px)',
                opacity: 0,
                transformOrigin: '50% 50%',
                duration: 1,
              },
              0,
            )
            .to(
              background,
              {
                scale: 1.2,
                filter: 'brightness(1.14) blur(1.2px)',
                transformOrigin: '50% 50%',
                duration: 1,
              },
              0,
            )
            .to(
              inner,
              {
                backgroundColor: '#000000',
                duration: 1,
              },
              0,
            );
        },
        '(max-width: 768px)': () => {
          if (!title || !background) {
            return;
          }

          const mobileZoom = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              end: 'bottom 28%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          mobileZoom
            .to(
              title,
              {
                scale: 1.25,
                yPercent: -2,
                transformOrigin: '50% 50%',
                duration: 1,
              },
              0,
            )
            .to(
              background,
              {
                scale: 1.06,
                duration: 1,
              },
              0,
            );
        },
      });
    }, this.synergySection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
