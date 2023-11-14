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
  private fullBaseUrlApi: string;

  constructor(private http: HttpClient, private localStorageManagerService: LocaleStorageManagerService) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName;
    const token = this.localStorageManagerService.getData(environment.LOCAL_STORAGE.TOKEN);
    this.internalToken$.next(token);
  }

  get token(): string |undefined {
    return this.internalToken$.value;
  }

  signIn(email: string, password: string, keepConnection: boolean): Promise<void | string> {
    const obsHttp$ = this.http.post<{token: string}>(`${this.fullBaseUrlApi}/auth`, { username: email, password });
    return firstValueFrom(obsHttp$) // renvoi une promesse. transforme observable en promesse.
      .then((res: {token: string}) => {
        this.internalToken$.next(res.token);
        if(keepConnection) {
          this.localStorageManagerService.saveData(environment.LOCAL_STORAGE.TOKEN, res.token);
        }
      });
  }

  signOut() {
    this.internalToken$.next(undefined);
    this.localStorageManagerService.removeData(environment.LOCAL_STORAGE.TOKEN);
  }
}
