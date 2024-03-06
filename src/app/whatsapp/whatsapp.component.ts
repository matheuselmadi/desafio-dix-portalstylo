import {Component} from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {

  openWhatsApp(): void {
    window.open('https://wa.me/64999449939', '_blank');
  }

}
