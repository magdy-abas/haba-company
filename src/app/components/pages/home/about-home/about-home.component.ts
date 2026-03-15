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
  selector: 'app-about-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-home.component.html',
  styleUrl: './about-home.component.scss',
})
export class AboutHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection', { static: true })
  private aboutSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: ' عــن هـــــبّة..',
    description:
      'هبّة شركة تطوير أعمال متخصصة في النمو المالي وتعظيم الإيرادات نساعد الشركات على إعادة تصميم نموذجها الربحي، وضبط معادلة الإيرادات، وبناء منظومة نمو قابلة للتوسع.',
    lead: 'نركز تحديدًا على تعظيم الإيرادات ورفع قابلية التوسع من خلال:',
    titleUnderline: 'assets/images/about-Vector.png',
    starImage: 'assets/images/Big-star.svg.png',
    glowImage: 'assets/images/about-glow.png',
    gridImage: 'assets/images/card-gridline.png.png',
  };

  readonly pillars = [
    { number: '01', title: 'زيادة كفاءة البيع' },
    { number: '02', title: 'رفع هامش الربح' },
    { number: '03', title: 'تحسين قيمة العميل' },
    { number: '04', title: 'بناء جاهزية تشغيلية تدعم النمو' },
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
          trigger: this.aboutSection.nativeElement,
          start: 'top 72%',
          once: true,
        },
      });

      timeline
        .from('.about-home__star', {
          opacity: 0,
          scale: 0.7,
          rotate: -12,
          duration: 0.8,
        })
        .from(
          '.about-home__header',
          {
            opacity: 0,
            y: 36,
            filter: 'blur(8px)',
            duration: 0.9,
          },
          '-=0.4',
        )
        .from(
          '.about-home__description, .about-home__lead',
          {
            opacity: 0,
            y: 28,
            filter: 'blur(10px)',
            duration: 0.8,
            stagger: 0.12,
          },
          '-=0.4',
        )
        .from(
          '.about-home__pillar',
          {
            opacity: 0,
            y: 34,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.12,
          },
          '-=0.2',
        )
        .from(
          '.about-home__glow',
          {
            opacity: 0,
            y: 24,
            scale: 0.88,
            filter: 'grayscale(1) blur(10px)',
            duration: 1.1,
          },
          '-=0.5',
        );
    }, this.aboutSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
