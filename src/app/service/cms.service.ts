import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "./httpOptions";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class CmsService {

  homeUrl: string = `https://local360.com.br/cms/public/api/v1/home-page`;
  settingsUrl: string = `https://local360.com.br/cms/public/api/v1/settings`;
  enqueteUrl: string = `https://local360.com.br/cms/public/api/v1/questions`;

  constructor(private http: HttpClient) {
  }

  getHomePage(): Observable<any> {
    return this.http.get(`${this.homeUrl}`, httpOptions);
  }

  getSettings(): Observable<any> {
    return this.http.get(`${this.settingsUrl}`, httpOptions);
  }

  getEnquetes(): Observable<any> {
    return this.http.get(`${this.enqueteUrl}`, httpOptions);
  }

  votarEnquete(id: number, answer: { answer: string }): Observable<any> {
    return this.http.put<void>(`${this.enqueteUrl}/${id}`, answer, httpOptions);
  }

}
