import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../home/navbar/navbar.component';
import {
  ContactFormComponent,
  ContactFormPayload,
} from '../../shared/contact-form/contact-form.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, ContactFormComponent, SiteFooterComponent, NgFor, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection', { static: true })
  private contactSection!: ElementRef<HTMLElement>;

  private animationContext?: gsap.Context;

  readonly content = {
    title: 'يسعدنا التواصل معك.!',
    subtitle:
      'هل لديك استفسار أو ترغب في تطوير عملك؟ تواصل معنا عبر البريد الإلكتروني، الهاتف، أو من خلال نموذج التواصل أدناه، وسيقوم فريق هِبَّة بمساعدتك وتقديم التوجيه المناسب لنمو مشروعك. يسعدنا أن نكون جزءًا من رحلة نموك.',
    backgroundImage: 'assets/images/contact-home-bg.png',
    shapeImage: 'assets/images/contact-us-shapes.png',
  };

  readonly titleWords = this.content.title.split(' ');
  readonly subtitleWords = this.content.subtitle.split(' ');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startContactAnimation();
  }

  onFormSubmit(payload: ContactFormPayload) {
    console.log('contact-form-submit', payload);
  }

  ngOnDestroy() {
    this.animationContext?.revert();
  }

  private startContactAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: this.contactSection.nativeElement,
          start: 'top 82%',
          once: true,
        },
      });

      timeline
        .from('.contact-us__backdrop', {
          autoAlpha: 0,
          scale: 1.04,
          duration: 1.2,
        })
        .from(
          '.contact-us__beam',
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 1,
          },
          '-=0.95',
        )
        .from(
          '.contact-us__copy',
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          '-=0.78',
        )
        .from(
          '.contact-us__title-word',
          {
            autoAlpha: 0,
            y: 14,
            duration: 0.42,
            stagger: 0.06,
          },
          '-=0.05',
        )
        .from(
          '.contact-us__subtitle-word',
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.3,
            stagger: 0.02,
          },
          '-=0.12',
        )
        .from(
          '.contact-us__form-shell',
          {
            autoAlpha: 0,
            y: 32,
            x: -18,
            duration: 1,
          },
          '-=0.7',
        )
        .from(
          '.contact-us__form-shell .contact-form__field, .contact-us__form-shell .contact-form__submit',
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.48,
            stagger: 0.08,
          },
          '-=0.52',
        )
        .from(
          '.contact-us__shape',
          {
            autoAlpha: 0,
            x: 40,
            y: -30,
            rotate: -10,
            duration: 1.4,
            ease: 'power2.inOut',
          },
          '-=0.2',
        );
    }, this.contactSection.nativeElement);
  }
}
