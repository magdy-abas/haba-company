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
  selector: 'app-philosophy-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './philosophy-home.component.html',
  styleUrl: './philosophy-home.component.scss',
})
export class PhilosophyHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('philosophySection', { static: true })
  private philosophySection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'فلسفة 16X',
    description:
      'في هبّة لا نبحث عن زيادة بسيطة في الأداء، 16X ليست رقمًا دعائيًا بل طريقة لإعادة تصميم معادلة النمو وقبل البحث عن تحسين جزئي في النتائج، نعيد ضبط عناصر الإيرادات بالكامل.',
    gridImage: 'assets/images/card-gridline.png',
    personImage: 'assets/images/16x-man.png',
  };

  readonly pillars = [
    {
      title: 'عرض قوي',
      icon: 'assets/images/Idea Sharing.png',
    },
    {
      title: 'تسعير صحيح',
      icon: 'assets/images/Idea.png',
    },
    {
      title: 'مسارات ربح فعّال',
      icon: 'assets/images/Coins.png',
    },
    {
      title: 'تشغيل يتحمل التوسع',
      icon: 'assets/images/Resize.png',
    },
    {
      title: 'تسويق محسوب',
      icon: 'assets/images/ChartBar.png',
    },
  ];

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
          trigger: this.philosophySection.nativeElement,
          start: 'top 76%',
          once: true,
        },
      });

      timeline
        .from('.philosophy-home__content', {
          opacity: 0,
          y: 20,
          duration: 0.8,
        })
        .from(
          '.philosophy-home__title, .philosophy-home__description',
          {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)',
            duration: 0.75,
            stagger: 0.12,
          },
          '-=0.45',
        )
        .from(
          '.philosophy-home__item',
          {
            opacity: 0,
            x: -22,
            duration: 0.65,
            stagger: 0.1,
          },
          '-=0.35',
        );
    }, this.philosophySection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
