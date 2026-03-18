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
  @ViewChild('sectionVideo')
  private sectionVideo?: ElementRef<HTMLVideoElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'فلسفة 16X',
    description:
      'في هبّة لا نبحث عن زيادة بسيطة في المبيعات، 16X ليست رقمًا دعائيًا، بل طريقة لإعادة تصميم معادلة النمو وقبل البحث عن تحسين جزئي في النتائج، نعيد ضبط عناصر الإيرادات بالكامل.',
    videoSrc: 'assets/images/vedio-section.mp4',
  };

  readonly pillars = [
    { title: 'عرض قوي', icon: 'assets/images/Idea Sharing.png' },
    { title: 'تسعير صحيح', icon: 'assets/images/Idea.png' },
    { title: 'مسار ربح فعال', icon: 'assets/images/Coins.png' },
    { title: 'تشغيل يتحمل التوسع', icon: 'assets/images/Resize.png' },
    { title: 'تسويق محسوب', icon: 'assets/images/ChartBar.png' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const videoEl = this.sectionVideo?.nativeElement;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.play().catch(() => {
        /* no-op: keep posterless video background safe */
      });
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: this.philosophySection.nativeElement,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .from('.philosophy-home__title, .philosophy-home__description', {
          autoAlpha: 0,
          y: 26,
          duration: 0.9,
          stagger: 0.12,
          filter: 'blur(8px)',
        })
        .from(
          '.philosophy-home__item',
          {
            autoAlpha: 0,
            y: 34,
            scale: 0.9,
            filter: 'blur(6px)',
            duration: 1.05,
            stagger: 0.16,
          },
          '-=0.38',
        );
    }, this.philosophySection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
