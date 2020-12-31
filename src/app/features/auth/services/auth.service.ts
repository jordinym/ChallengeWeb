import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(Username: string , Password: string) {
    const url = `/auth/Autenticar`;
    const result = this.apiService.post(url, { Username, Password })
      .pipe(
        catchError( error => {
          if ( !(error.error instanceof ErrorEvent)) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 404) {
              // return of(true);
            }
          }
          let data = {
            Message: "Error de conexión con el servicio. Servicio no disponible."
          }
          return of(data);
        }),
        map((res) => {
        console.log(res);
        return res;
      }));
    return result;
  }


}
