import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {RodapeComponent} from "./rodape/rodape.component";
import {WhatsappComponent} from "./whatsapp/whatsapp.component";
import {HttpClientModule} from "@angular/common/http";
import {CmsService} from "./service/cms.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, RodapeComponent, WhatsappComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CmsService]
})
export class AppComponent {
  title = 'desafio-dix-portalstylo';
}
