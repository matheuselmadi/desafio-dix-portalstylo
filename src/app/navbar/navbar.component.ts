import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CmsService} from "../service/cms.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  settings: any;

  constructor(private cmsService: CmsService) {
  }

  ngOnInit(): void {
    this.findSettings();
  }

  findSettings() {
    this.cmsService.getSettings().subscribe(data => {
      this.settings = data;
    });
  }

}
