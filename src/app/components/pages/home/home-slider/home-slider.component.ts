import { isPlatformBrowser, NgFor } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type SliderService = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class HomeSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderSection', { static: true })
  private sliderSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly isBrowser: boolean;

  readonly title = 'الــــــذراع التنفـــــيذي للنمــــو';

  readonly description =
    'بعد إعادة تصميم المعادلة، نشغّل أدوات التنفيذ تحت إشرافنا لضمان تحقيق النتائج، وتشمل عند الحاجة:';

  readonly assets = {
    cardBackground: 'assets/images/slider-card-bg.png',
    cardIcon: 'assets/images/slider-card-icon.png',
  };

  readonly topServicesSource: SliderService[] = [
    {
      title: 'تنظيم الفعاليات',
      description:
        'نخطط وننفذ فعاليات احترافية تعزز حضور علامتك التجارية وتخلق تجربة مؤثرة للجمهور.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
    {
      title: 'العلاقات العامة',
      description:
        'نبني علاقات قوية مع الجمهور ووسائل الإعلام لتعزيز صورة العلامة وثقة العملاء.',
    },
  ];

  readonly bottomServicesSource: SliderService[] = [
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
    {
      title: 'تحسين محركات البحث والذكاء الاصطناعي',
      description:
        'نحسن ظهورك في محركات البحث باستخدام البيانات والذكاء الاصطناعي لزيادة الزيارات.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    requestAnimationFrame(() => {
      const swipers =
        this.sliderSection.nativeElement.querySelectorAll('swiper-container');

      swipers.forEach((swiper: any) => {
        if (swiper.swiper?.autoplay) {
          swiper.swiper.autoplay.start();
        }
      });

      this.setupScrollAnimation();
      ScrollTrigger.refresh();
    });
  }

  private setupScrollAnimation() {
    this.animationContext?.revert();

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        scrollTrigger: {
          trigger: this.sliderSection.nativeElement,
          start: 'top 80%',
          once: true,
        },
      });

      timeline
        .from('.home-slider__glow', {
          opacity: 0,
          scale: 0.82,
          y: 36,
          filter: 'grayscale(1) brightness(1.2) blur(16px)',
          duration: 1.1,
        })
        .from(
          '.home-slider__title, .home-slider__desc',
          {
            opacity: 0,
            y: 42,
            filter: 'blur(10px)',
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.65',
        )
        .from(
          '.home-slider__carousel',
          {
            opacity: 0,
            y: 54,
            duration: 1,
            stagger: 0.16,
          },
          '-=0.4',
        )
        .from(
          '.home-slider__carousel .service-card',
          {
            opacity: 0,
            y: 28,
            scale: 0.97,
            duration: 0.75,
            stagger: 0.04,
          },
          '-=0.7',
        )
        .from(
          '.home-slider__cta',
          {
            opacity: 0,
            y: 24,
            scale: 0.96,
            duration: 0.75,
          },
          '-=0.35',
        );
    }, this.sliderSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
