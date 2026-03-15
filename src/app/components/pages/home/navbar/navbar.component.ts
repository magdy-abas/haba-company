import { NgFor } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbOffcanvasModule, NgFor],
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
    { title: 'الرئيسية', link: '#' },
    { title: 'من نحن', link: '#' },
    { title: 'خدماتنا', link: '#' },
    { title: 'المدونة', link: '#' },
    { title: 'تواصل معنا', link: '#' },
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
