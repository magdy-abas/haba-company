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
import {
  ContactFormComponent,
  ContactFormPayload,
} from '../../../shared/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-home',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.scss',
})
export class ContactHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection', { static: true })
  private contactSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title:
      'هـــــل ترغــــــــــــــــب في تطـــــــــوير عــملك وتحـــقيق نمـــو أكـــــبر؟',
    subtitle:
      'اترك بياناتك وسيتواصل معك فريق هبّة لدراسة مشروعك واقتراح أفضل فرص النمو.',
    backgroundImage: 'assets/images/contact-home-bg.png',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: this.contactSection.nativeElement,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .from('.contact-home__beam, .contact-home__backdrop', {
          autoAlpha: 0,
          scale: 0.97,
          y: 22,
          duration: 1.1,
        })
        .from(
          '.contact-home__copy',
          {
            autoAlpha: 0,
            x: 24,
            duration: 0.9,
          },
          '-=0.72',
        )
        .from(
          '.contact-home__form-shell',
          {
            autoAlpha: 0,
            x: -28,
            y: 20,
            duration: 1,
          },
          '-=0.62',
        );
    }, this.contactSection.nativeElement);
  }

  onFormSubmit(payload: ContactFormPayload) {
    console.log('contact-home-form-submit', payload);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }
}
