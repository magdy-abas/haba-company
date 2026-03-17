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
  selector: 'app-how-work-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './how-work-home.component.html',
  styleUrl: './how-work-home.component.scss',
})
export class HowWorkHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('howWorkSection', { static: true })
  private howWorkSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'كـــــــيف نعــــمل',
    subtitle: 'نعمل من خلال اربع مراحل واضحة:',
    titleGlowImage: 'assets/images/qos-glow.png',
    centerGlowImage: 'assets/images/work-glow.png',
    gridImage: 'assets/images/card-gridline.png',
  };

  readonly steps = [
    {
      title: 'التشخيص',
      description:
        'نحدد بدقة أين يتعطل النمو داخل المشروع من خلال فقدان الربح، تسرب العملاء، اختناقات التشغيل، وهدر الإنفاق.',
      icon: 'assets/images/work-icon1.svg',
      side: 'right',
    },
    {
      title: 'الاستراتيجية',
      description:
        'نضع استراتيجية نمو واضحة مبنية على نتائج التشخيص، تحدد فرص التوسع وأولويات التحسين داخل المشروع.',
      icon: 'assets/images/work-icon2.svg',
      side: 'left',
    },
    {
      title: 'إعادة التصميم',
      description:
        'نعيد ضبط عناصر الإيرادات الأساسية من خلال نموذج العمل، العرض التسعيري، مسار البيع، وجاهزية التشغيل للنمو.',
      icon: 'assets/images/work-icon3.svg',
      side: 'right',
    },
    {
      title: 'التنفيذ والقياس',
      description:
        'نحوّل الاستراتيجية إلى نتائج عبر خطة 30 / 60 / 90 يوم، مؤشرات أداء واضحة وتحسين مستمر للأداء.',
      icon: 'assets/images/work-icon1.4.svg',
      side: 'left',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 770px)').matches;

      gsap.set('.how-work-home__title-area', {
        '--qos-opacity': 0,
        '--qos-scale': 0.88,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
        scrollTrigger: {
          trigger: this.howWorkSection.nativeElement,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .to('.how-work-home__title-area', {
          '--qos-opacity': 1,
          '--qos-scale': 1,
          duration: 1.25,
        })
        .from(
          '.how-work-home__title',
          {
            autoAlpha: 0,
            y: 20,
            scale: 0.94,
            duration: 1.05,
          },
          '-=0.45',
        )
        .from(
          '.how-work-home__subtitle',
          {
            autoAlpha: 0,
            y: 22,
            duration: 1.05,
          },
          '-=0.84',
        )
        .from(
          '.how-work-home__center-glow',
          {
            autoAlpha: 0,
            scale: 0.74,
            y: 22,
            duration: 1.35,
          },
          '-=0.92',
        );

      if (isMobile) {
        timeline.from(
          '.how-work-home__step',
          {
            autoAlpha: 0,
            y: 26,
            duration: 1.02,
            stagger: 0.13,
          },
          '-=0.95',
        );
      } else {
        timeline
          .from(
            '.how-work-home__step:nth-of-type(1), .how-work-home__step:nth-of-type(3)',
            {
              autoAlpha: 0,
              x: 54,
              y: 20,
              duration: 1.1,
              stagger: 0.15,
            },
            '-=1.05',
          )
          .from(
            '.how-work-home__step:nth-of-type(2), .how-work-home__step:nth-of-type(4)',
            {
              autoAlpha: 0,
              x: -54,
              y: 20,
              duration: 1.1,
              stagger: 0.15,
            },
            '<',
          );
      }

      timeline.from(
        '.how-work-home__icon-box',
        {
          autoAlpha: 0,
          scale: 0.82,
          duration: 0.82,
          stagger: 0.08,
        },
        '-=0.72',
      );
    }, this.howWorkSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
