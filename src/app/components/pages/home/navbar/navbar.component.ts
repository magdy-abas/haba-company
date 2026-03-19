import { NgFor } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbOffcanvasModule, NgFor, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly content = {
    logoSrc: 'assets/images/logo.svg',
    consultationLabel: 'استشارة مجانية',
    closeIconClass: 'fa-solid fa-xmark',
  };

  readonly menu = [
    { title: 'الرئيسية', link: '/' },
    { title: 'من نحن', link: '/about' },
    { title: 'خدماتنا', link: '/services' },
    { title: 'المدونة', link: '/blog' },
    { title: 'تواصل معنا', link: '/contact' },
  ];

  constructor(private offcanvas: NgbOffcanvas) {}

  openMenu(content: TemplateRef<any>) {
    this.offcanvas.open(content, {
      position: 'start',
      panelClass: 'mobile-offcanvas',
      backdrop: true,
      keyboard: true,
    });
  }
}
