import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
})
export class SiteFooterComponent {
  readonly content = {
    ctaLabel: 'اطلب استشارة مجانية الآن!',
    copyright: '© جميع الحقوق محفوظة لموقع هِبّة - جروب 2025',
    logo: 'assets/images/logo.svg',
  };
}
