import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
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
export class BlogComponent {
  readonly content = {
    title: 'المدونة',
    subtitle:
      'مقالات ورؤى عملية حول تطوير نموذج العمل، تنظيم الإيرادات، وبناء أنظمة نمو قابلة للتوسع للشركات الطموحة.',
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
      excerpt: 'خطوات عملية لتحويل النمو من مجهود يومي إلى نظام واضح قابل للتوسع.',
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
}
