import { Routes } from '@angular/router';
import {HomeComponent} from "./paginas/home/home.component";
import {NotfoundComponent} from "./paginas/notfound/notfound.component";
import {PrivacyComponent} from "./paginas/privacy/privacy.component";
import {EnquetesComponent} from "./paginas/enquetes/enquetes.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "enquetes", component: EnquetesComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "**", component: NotfoundComponent },
];
