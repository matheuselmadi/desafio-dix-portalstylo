import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {CmsService} from "../../service/cms.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

interface InstagramPost {
  imageUrl: string;
  username: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  filtrados: any;
  politica: any;
  municipio: any;
  mostrarAvisoCookies = true;
  enquetes: any;
  alternativaSelecionada: string = '';
  mostrarModalResultados: boolean = false;

  currentIndexPolitica = 0;
  currentIndexGeral = 0;
  currentIndexMunicipio = 0;
  currentBannerIndex: number = 0;

  imagesPolitica = ['/assets/img/home/c1.png', '/assets/img/home/c2.png'];
  imagesGeral = ['/assets/img/home/c3.png', '/assets/img/home/c4.png'];
  imagesMunicipio = ['/assets/img/home/c5.png', '/assets/img/home/c6.png'];

  newsPolitica = [
    {title: 'CRUZAMENTO DE DADOS', description: 'Prova de vida passará a ser responsabilidade do INSS'},
    {title: 'CPP  SUPERLOTADA', description: 'Promotor pede transferência de presos de Palmas para o interior'},
  ];
  newsGeral = [
    {title: 'CRUZAMENTO DE DADOS', description: 'Prova de vida passará a ser responsabilidade do INSS'},
    {title: 'CPP  SUPERLOTADA', description: 'Promotor pede transferência de presos de Palmas para o interior'},
  ];
  newsMunicipio = [
    {title: 'CRUZAMENTO DE DADOS', description: 'Prova de vida passará a ser responsabilidade do INSS'},
    {title: 'CPP  SUPERLOTADA', description: 'Promotor pede transferência de presos de Palmas para o interior'},
  ];

  posts: InstagramPost[] = [
    {
      imageUrl: '/assets/img/home/insta-exemplo.png',
      username: '@portalstylo.oficial',
      caption: 'Descrição/legenda presente na publicação'
    },
    {
      imageUrl: '/assets/img/home/insta-exemplo.png',
      username: '@portalstylo.oficial',
      caption: 'Descrição/legenda presente na publicação'
    },
    {
      imageUrl: '/assets/img/home/insta-exemplo.png',
      username: '@portalstylo.oficial',
      caption: 'Descrição/legenda presente na publicação'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cmsService: CmsService
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setTimeCarousel();
      this.setTimePublicidade();
    }

    this.findHome();

  }

  findHome() {
    this.cmsService.getHomePage().subscribe(data => {
      this.filtrados = data;

      this.politica = this.filtrados?.data.home.filter((p: any) => p.name === 'Política');
      this.imagesPolitica = [this.politica[0].contents[0].image, this.politica[0].contents[1].image]
      this.newsPolitica = [
        {title: this.politica[0].contents[0].title, description: this.politica[0].contents[0].subtitle},
        {title: this.politica[0].contents[1].title, description: this.politica[0].contents[1].subtitle},
      ];

      this.municipio = this.filtrados?.data.home.filter((m: any) => m.name === 'Município');
      this.imagesMunicipio = [this.municipio[0].contents[0].image, this.municipio[0].contents[1].image]
      this.newsMunicipio = [
        {title: this.municipio[0].contents[0].title, description: this.municipio[0].contents[0].subtitle},
        {title: this.municipio[0].contents[1].title, description: this.municipio[0].contents[1].subtitle},
      ];
    });

    this.cmsService.getEnquetes().subscribe(data => {
      this.enquetes = data;
    })

  }

  setTimeCarousel() {
    setInterval(() => {
      this.currentIndexPolitica = (this.currentIndexPolitica + 1) % this.imagesPolitica.length;
      this.currentIndexGeral = (this.currentIndexGeral + 1) % this.imagesGeral.length;
      this.currentIndexMunicipio = (this.currentIndexMunicipio + 1) % this.imagesMunicipio.length;
    }, 5000);
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
    window.location.reload();
  }

  aceitarCookies() {
    this.mostrarAvisoCookies = false;
  }

  protected readonly Object = Object;
}
