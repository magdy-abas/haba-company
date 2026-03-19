import { isPlatformBrowser, NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../home/navbar/navbar.component';
import { ClientsHomeComponent } from '../home/clients-home/clients-home.component';
import { ContactHomeComponent } from '../home/contact-home/contact-home.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NgFor,
    NavbarComponent,
    ClientsHomeComponent,
    ContactHomeComponent,
    SiteFooterComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  @ViewChild('heroHeading') private heroHeading?: ElementRef<HTMLElement>;
  @ViewChild('cardsSection') private cardsSection?: ElementRef<HTMLElement>;

  heroVisible = false;
  cardsVisible = false;

  readonly content = {
    title: 'المـــــــــــــــــدونة',
    subtitle:
      'مقالات ورؤى عملية حول تطوير نموذج العمل، تعظيم الإيرادات، وبناء أنظمة نمو قابلة للتوسع للشركات الطموحة.',
    backgroundImage: 'assets/images/blog-bg.png',
  };

  readonly posts = [
    {
      title: 'أسرار زيادة الإيرادات في الشركات',
      excerpt: 'استراتيجيات تساعدك على رفع المبيعات وتحسين الربحية.',
      image: 'assets/images/blog-img-1.png',
    },
    {
      title: 'لماذا تتوقف الشركات عن النمو؟',
      excerpt: 'أهم الأسباب التي تعطل الإيرادات وكيف يمكن إصلاحها.',
      image: 'assets/images/blog-img-2.png',
    },
    {
      title: 'كيف تبني منظومة نمو لشركتك',
      excerpt:
        'خطوات عملية لتحويل النمو من مجهود يومي إلى نظام واضح قابل للتوسع.',
      image: 'assets/images/blog-img-3.png',
    },
    {
      title: 'تحويل التسويق من تكلفة إلى محرك نمو',
      excerpt: 'كيف تجعل التسويق يساهم في زيادة الإيرادات.',
      image: 'assets/images/blog-img-4.png',
    },
    {
      title: 'بناء نموذج عمل قابل للتوسع',
      excerpt: 'كيف تصمم نموذجًا قادرًا على النمو المستمر.',
      image: 'assets/images/blog-img-5.png',
    },
    {
      title: 'كيف نرفع كفاءة فريق المبيعات',
      excerpt: 'أدوات بسيطة لتحسين الأداء وتحقيق نتائج أفضل.',
      image: 'assets/images/blog-img-6.png',
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.heroVisible = true;
      this.cardsVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (entry.target === this.heroHeading?.nativeElement) {
            this.heroVisible = true;
          }

          if (entry.target === this.cardsSection?.nativeElement) {
            this.cardsVisible = true;
          }

          this.observer?.unobserve(entry.target);
        }
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    if (this.heroHeading?.nativeElement) {
      this.observer.observe(this.heroHeading.nativeElement);
    }

    if (this.cardsSection?.nativeElement) {
      this.observer.observe(this.cardsSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
