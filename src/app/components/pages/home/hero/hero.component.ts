import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';
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

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroSection', { static: true })
  private heroSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'نحوّل الأعمال من مشاريع<br>تعمل إلى منظومات تنمو.',
    description:
      'هبّة شركة تطوير أعمال متخصصة في هندسة منظومات النمو وتعظيم الإيرادات، نعمل مع الشركات لبناء أنظمة نمو قابلة للتوسع وفق منهجية 16X.',
    glowImage: 'assets/images/glow.png',
  };

  readonly actions = [
    {
      label: 'تعرّف على هبّة',
      iconClass: 'fa-solid fa-arrow-right-from-bracket',
      buttonClass: 'btn-outline-ui',
    },
    {
      label: 'تحدث مع فريق هبّة',
      iconClass: 'fa-brands fa-whatsapp',
      buttonClass: 'btn-primary',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animationContext = gsap.context(() => {
      const buttons = gsap.utils.toArray<HTMLElement>('.hero-action-button');
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
        )
        .fromTo(
          buttons,
          {
            y: 22,
            autoAlpha: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform,filter',
          },
          '-=.55',
        );
    }, this.heroSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
