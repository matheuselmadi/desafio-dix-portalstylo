import {Component, OnInit} from '@angular/core';
import {CmsService} from "../service/cms.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.scss'
})
export class RodapeComponent implements OnInit {
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
