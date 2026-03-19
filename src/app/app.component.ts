import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('transitionLayer', { static: true })
  private transitionLayer!: ElementRef<HTMLElement>;

  @ViewChild('transitionLogo', { static: true })
  private transitionLogo!: ElementRef<HTMLElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  private routeEventsSub?: Subscription;
  private transitionTimeline?: gsap.core.Timeline;
  private transitionEndTimeout: ReturnType<typeof setTimeout> | null = null;
  private transitionStartedAt = 0;
  private readonly minTransitionTime = 1200;

  readonly transitionLogoSrc = 'assets/images/logo.svg';
  isRouteTransitioning = false;

  title = 'HABBAH';

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const isCoarsePointer = window.matchMedia(
      '(hover: none), (pointer: coarse)',
    ).matches;

    this.lenis = new Lenis(
      isCoarsePointer
        ? {
            autoRaf: false,
            smoothWheel: true,
            syncTouch: false,
            duration: 0.9,
            lerp: 0.12,
            wheelMultiplier: 1,
            touchMultiplier: 1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          }
        : {
            autoRaf: false,
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.08,
            touchInertiaExponent: 1.4,
            duration: 1.2,
            lerp: 0.08,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
    );

    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };

    this.rafId = requestAnimationFrame(raf);

    // Loading screen
    // this.setupRouteTransitionAnimation();

    this.destroyRef.onDestroy(() => {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }

      if (this.transitionEndTimeout) {
        clearTimeout(this.transitionEndTimeout);
      }

      this.routeEventsSub?.unsubscribe();
      this.transitionTimeline?.kill();
      this.lenis?.destroy();
      this.lenis = null;
    });
  }

  private setupRouteTransitionAnimation() {
    const layer = this.transitionLayer.nativeElement;
    const logo = this.transitionLogo.nativeElement;

    gsap.set(layer, {
      clipPath: 'circle(0% at 50% 50%)',
    });
    gsap.set(logo, {
      autoAlpha: 0,
      scale: 0.86,
    });

    this.routeEventsSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.router.navigated) {
          return;
        }

        this.playTransitionIn();
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.scheduleTransitionOut();
      }
    });
  }

  private playTransitionIn() {
    const layer = this.transitionLayer.nativeElement;
    const logo = this.transitionLogo.nativeElement;

    if (this.transitionEndTimeout) {
      clearTimeout(this.transitionEndTimeout);
      this.transitionEndTimeout = null;
    }

    this.transitionTimeline?.kill();
    this.isRouteTransitioning = true;
    this.transitionStartedAt = performance.now();

    gsap.set(layer, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(logo, { autoAlpha: 0, scale: 0.86 });

    this.transitionTimeline = gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
      })
      .to(layer, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 1.05,
      })
      .to(
        logo,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.62',
      );
  }

  private scheduleTransitionOut() {
    if (!this.isRouteTransitioning) {
      return;
    }

    const elapsed = performance.now() - this.transitionStartedAt;
    const delay = Math.max(0, this.minTransitionTime - elapsed);

    if (this.transitionEndTimeout) {
      clearTimeout(this.transitionEndTimeout);
    }

    this.transitionEndTimeout = setTimeout(() => {
      this.playTransitionOut();
    }, delay);
  }

  private playTransitionOut() {
    const layer = this.transitionLayer.nativeElement;
    const logo = this.transitionLogo.nativeElement;

    this.transitionTimeline?.kill();

    this.transitionTimeline = gsap
      .timeline({
        onComplete: () => {
          this.isRouteTransitioning = false;
        },
      })
      .to(logo, {
        autoAlpha: 0,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        layer,
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.95,
          ease: 'power3.inOut',
        },
        '-=0.08',
      );
  }
}
