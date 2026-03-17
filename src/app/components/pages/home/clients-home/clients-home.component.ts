import { isPlatformBrowser, NgFor } from '@angular/common';
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
  selector: 'app-clients-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './clients-home.component.html',
  styleUrl: './clients-home.component.scss',
})
export class ClientsHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clientsSection', { static: true })
  private clientsSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'عملاؤنا..',
    subtitle: 'نعمل مع الشركات التي تبحث عن نمو حقيقي ومستدام.',
    bgImage: 'assets/images/coustmer-bg.png',
    bottomArrowsImage: 'assets/images/coustomer-bg-bottompng.png',
    total: '+30',
    totalCount: 30,
  };

  readonly clients = [
    { name: 'الحازم', logo: 'assets/images/coustomer-1.png' },
    { name: 'الدانوب', logo: 'assets/images/coustomer-2.png' },
    { name: 'بن داوود', logo: 'assets/images/coustomer-3.png' },
    { name: 'جوردان بيلد', logo: 'assets/images/coustomer-4.png' },
    { name: 'الرومانسية', logo: 'assets/images/coustomer-5.png' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const countElement = this.clientsSection.nativeElement.querySelector(
        '.clients-home__count',
      ) as HTMLElement | null;
      const topBackgroundHost = this.clientsSection.nativeElement.querySelector(
        '.clients-home__inner',
      ) as HTMLElement | null;

      gsap.set(this.clientsSection.nativeElement, {
        '--clients-bottom-opacity': 0,
        '--clients-bottom-shift': '26px',
        '--clients-bottom-scale': 1.06,
      });

      if (topBackgroundHost) {
        gsap.set(topBackgroundHost, {
          '--clients-top-opacity': 0,
          '--clients-top-shift': '20px',
          '--clients-top-scale': 1.04,
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: this.clientsSection.nativeElement,
          start: 'top 78%',
          once: true,
        },
      });

      timeline.to(this.clientsSection.nativeElement, {
        '--clients-bottom-opacity': 0.84,
        '--clients-bottom-shift': '0px',
        '--clients-bottom-scale': 1,
        duration: 1.1,
      });

      if (topBackgroundHost) {
        timeline.to(
          topBackgroundHost,
          {
            '--clients-top-opacity': 0.8,
            '--clients-top-shift': '0px',
            '--clients-top-scale': 1,
            duration: 1.1,
          },
          '<',
        );
      }

      timeline
        .from('.clients-home__heading', {
          autoAlpha: 0,
          y: 26,
          duration: 1,
        })
        .from(
          '.clients-home__curve-line, .clients-home__bottom-arrows',
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.95,
          },
          '-=0.55',
        )
        .from(
          '.clients-home__logo',
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.86,
            duration: 1.15,
            stagger: 0.28,
          },
          '-=0.45',
        );

      if (!countElement) {
        return;
      }

      countElement.textContent = '+0';
      const counter = { value: 0 };

      timeline
        .from(
          '.clients-home__count',
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.8,
          },
          '-=0.25',
        )
        .to(
          counter,
          {
            value: this.content.totalCount,
            duration: 2.7,
            ease: 'power1.out',
            onUpdate: () => {
              countElement.textContent = `+${Math.round(counter.value)}`;
            },
          },
          '-=0.05',
        );

      gsap.to(this.clientsSection.nativeElement, {
        '--clients-bottom-shift': '8px',
        '--clients-bottom-scale': 1.012,
        duration: 5.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      if (topBackgroundHost) {
        gsap.to(topBackgroundHost, {
          '--clients-top-shift': '-6px',
          '--clients-top-scale': 1.012,
          duration: 6.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, this.clientsSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
