import {
  AfterViewInit,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  title = 'HABBAH';

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const isCoarsePointer = window.matchMedia(
      '(hover: none), (pointer: coarse)'
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
          }
    );

    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };

    this.rafId = requestAnimationFrame(raf);

    this.destroyRef.onDestroy(() => {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
      this.lenis?.destroy();
      this.lenis = null;
    });
  }
}
