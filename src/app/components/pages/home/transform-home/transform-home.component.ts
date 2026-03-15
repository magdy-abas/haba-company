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
  selector: 'app-transform-home',
  standalone: true,
  imports: [],
  templateUrl: './transform-home.component.html',
  styleUrl: './transform-home.component.scss',
})
export class TransformHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('transformSection', { static: true })
  private transformSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    eyebrow: 'حلول متكاملة تلبي احتياجاتك وتدفع علامتك نحو التميز.',
    titleFirstLine:
      'نحــوّل الشركـــة ــــــــــ من نشـاط يعـــتمد على الجــهد المستمر',
    titleSecondLine:
      'إلى نظـــــام نمــــو واضـــح، قابل للقــياس، وقـــابل للتكـــرار.',
    gridImage: 'assets/images/card-gridline.png',
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
          trigger: this.transformSection.nativeElement,
          start: 'top 76%',
          once: true,
        },
      });

      timeline
        .from('.transform-home__card', {
          opacity: 0,
          y: 42,
          scale: 0.97,
          duration: 0.95,
        })
        .from(
          '.transform-home__eyebrow',
          {
            opacity: 0,
            y: 18,
            filter: 'blur(8px)',
            duration: 0.7,
          },
          '-=0.45',
        )
        .from(
          '.transform-home__title-line',
          {
            opacity: 0,
            y: 28,
            filter: 'blur(10px)',
            duration: 0.8,
            stagger: 0.14,
          },
          '-=0.35',
        );
    }, this.transformSection.nativeElement);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
