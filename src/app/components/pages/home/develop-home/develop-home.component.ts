import { isPlatformBrowser, NgClass, NgFor, NgIf } from '@angular/common';
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
  selector: 'app-develop-home',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './develop-home.component.html',
  styleUrl: './develop-home.component.scss',
})
export class DevelopHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('developSection', { static: true })
  private developSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'كيف نطور الأعمال',
    description:
      'نساعد الشركات على تحقيق النمو من خلال العمل على العناصر الأساسية لمنظومة الإيرادات:',
    cubeImage: 'assets/images/Cube.png',
    gradientImage: 'assets/images/Gradient.png',
  };

  readonly cards = [
    {
      number: '01',
      title: 'تطوير نموذج العمل',
      description:
        'إعادة تصميم النموذج الربحي وفتح فرص نمو جديدة داخل المشروع.',
      tone: 'dark wide',
      iconClass: 'fa-solid fa-chart-pie',
    },
    {
      number: '02',
      title: 'تعظيم الإيرادات',
      description: 'تحسين كفاءة البيع ورفع قيمة العميل، وزيادة الربحية.',
      tone: 'muted small',
      iconClass: '',
    },
    {
      number: '',
      title: 'استراتيجيات التسويق والنمو',
      description:
        'تصميم حملات تسويقية تعمل كرافعة للنمو وليس مجرد نشاط ترويجي.',
      tone: 'light wide gradient reversed',
      iconClass: '',
    },
    {
      number: '',
      title: 'بناء العلامة التجارية',
      description: 'تطوير الهوية والرسالة التسويقية بما يدعم توسع المشروع.',
      tone: 'dark small',
      iconClass: 'fa-solid fa-shield-halved',
    },
  ];

  readonly topRow = [this.cards[0], this.cards[1]];
  readonly bottomRow = [this.cards[2], this.cards[3]];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
        scrollTrigger: {
          trigger: this.developSection.nativeElement,
          start: 'top 76%',
          once: true,
        },
      });

      timeline
        .from('.develop-home__cube', {
          opacity: 0,
          scale: 0.68,
          rotate: -10,
          y: 22,
          duration: 1.05,
        })
        .from(
          '.develop-home__header',
          {
            opacity: 0,
            y: 34,
            filter: 'blur(12px)',
            duration: 1,
          },
          '-=0.55',
        )
        .from(
          '.develop-home__row--top .develop-home__card',
          {
            opacity: 0,
            y: 40,
            filter: 'blur(10px)',
            duration: 0.95,
            stagger: 0.16,
          },
          '-=0.5',
        )
        .from(
          '.develop-home__row--bottom .develop-home__card',
          {
            opacity: 0,
            y: 40,
            filter: 'blur(10px)',
            duration: 0.95,
            stagger: 0.16,
          },
          '-=0.62',
        );
    }, this.developSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
