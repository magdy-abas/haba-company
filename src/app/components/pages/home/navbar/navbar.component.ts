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
  constructor(private offcanvas: NgbOffcanvas) {}

  menu = [
    { title: 'الرئيســـية', link: '#' },
    { title: 'من نحــــــن ', link: '#' },
    { title: 'خـــــدماتنا', link: '#' },
    { title: 'المــــدونـــة', link: '#' },
    { title: ' تواصل معنا', link: '#' },
  ];

  openMenu(content: TemplateRef<any>) {
    this.offcanvas.open(content, {
      position: 'start',
      panelClass: 'mobile-offcanvas',
      backdrop: true,
      keyboard: true,
    });
  }
}
