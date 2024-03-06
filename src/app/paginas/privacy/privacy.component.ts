import {Component, OnInit} from '@angular/core';
import {CmsService} from "../../service/cms.service";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
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
