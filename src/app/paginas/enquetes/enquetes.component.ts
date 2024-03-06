import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CmsService} from "../../service/cms.service";

@Component({
  selector: 'app-enquetes',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    DatePipe
  ],
  templateUrl: './enquetes.component.html',
  styleUrl: './enquetes.component.scss'
})
export class EnquetesComponent implements OnInit {
  filtrados: any;
  enquetes: any;
  alternativaSelecionada: string = '';
  mostrarModalResultados: boolean = false;
  resultadoEnqueteId: number | null = null;

  currentBannerIndex: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cmsService: CmsService
  ) {
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
      this.setTimePublicidade();
    }

    this.findHome();

  }

  findHome() {
    this.cmsService.getHomePage().subscribe(data => {
      this.filtrados = data;
    });

    this.cmsService.getEnquetes().subscribe(data => {
      this.enquetes = data;
      console.log(data)
    })

  }

  setTimePublicidade() {
    setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % 3;
    }, 10000);
  }

  changeBanner(index: number) {
    this.currentBannerIndex = index;
  }

  votarEnquete(id: number, alternativa: string) {
    const body = {answer: alternativa};
    this.resultadoEnqueteId = id;
    this.cmsService.votarEnquete(id, body).subscribe(response => {
      this.cmsService.getEnquetes().subscribe(data => {
        this.enquetes = data;
        this.mostrarModalResultados = true;
      })
    }, error => {
      console.error('Erro ao enviar voto', error);
    });
  }

  fecharModalResultados(): void {
    this.mostrarModalResultados = false;
    this.resultadoEnqueteId = null;
    window.location.reload();
  }

  protected readonly Object = Object;
}
