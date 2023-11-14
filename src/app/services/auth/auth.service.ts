import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocaleStorageManagerService } from '../local-storage-manager/local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private internalToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  token$: Observable<string |undefined> = this.internalToken$.asObservable();

  private baseUrlApi: string = environment.API_URL;
  private resourceName: string = 'security';

  constructor(private http: HttpClient, private localStorageManagerService: LocaleStorageManagerService) {
    const token = this.localStorageManagerService.getData(environment.LOCAL_STORAGE.TOKEN);
    this.internalToken$.next(token);
  }

  get token(): string |undefined {
    return this.internalToken$.value;
  }

  // SIGN IN DE SONNY
  signIn(
    email: string,
    password: string,
    keepConnection: boolean
  ): Promise<void | undefined> {
    return new Promise((resolve, reject) => {
      if (email === 'admin@admin.fr' && password === 'P@ssw0rd2023') {
        if (keepConnection) {
          this.localStorageManagerService.saveData(
            environment.LOCAL_STORAGE.TOKEN,
            'Sonny.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SECRETJWTTOKEN'
          );
        }
        this.internalToken$.next(
          'Sonny.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SECRETJWTTOKEN'
        );
        resolve();
      } else {
        reject(Error('Incorrect identifiers !'));
      }
    });
  }

  signOut() {
    this.internalToken$.next(undefined);
    this.localStorageManagerService.removeData(environment.LOCAL_STORAGE.TOKEN);
  }
}

