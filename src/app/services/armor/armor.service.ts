import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Armor, ArmorForm, ArmorHttp } from 'src/app/models/armor.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
  // 'https://mhw-db.com/armor'
  private baseUrlApi: string = environment.API_URL;
  private resourceName: string = 'armor';
  private fullBaseUrlApi: string;

  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName;
  }
  // GET ALL
  getAll(): Promise<Armor[]> {
    const obsHttp$ = this.http
    .get<ArmorHttp[]>(`${this.fullBaseUrlApi}`)
    .pipe(
      map((armorsHttp: ArmorHttp[]) => armorsHttp.map((armorHttp: ArmorHttp) => Armor.mapperArmorHttpToArmor(armorHttp)))
      );
    return firstValueFrom(obsHttp$);
  }
  // GET BY ID
  getById(id: number): Promise<Armor> {
    const obsHttp$ = this.http
      .get<ArmorHttp>(`${this.fullBaseUrlApi}/${id}`)
      .pipe(
        map((armorHttp: ArmorHttp) => Armor.mapperArmorHttpToArmor(armorHttp))
    );
    return firstValueFrom(obsHttp$);
  }
  // ADD
  add(armorToAdd: ArmorForm): Promise<any> {
    const obsHttp$ = this.http
      .post(`${this.fullBaseUrlApi}/`, armorToAdd);

    return firstValueFrom(obsHttp$); // toPromise
  }
  // ADD FAKE
  addFake(armorToAdd: ArmorForm): Promise<any> {
    const obsHttp$ = new Promise((resolve, reject) => {
      if (armorToAdd) {
        resolve(armorToAdd);
      } else {
        reject(Error('Add error'));
      }
    });
    console.log("FAKE ADD : ", obsHttp$);

    return obsHttp$;
  }
  // EDIT
  edit(id: number, armorEdited: ArmorForm): Promise<any> {
    const obsHttp$ = this.http
      .put(`${this.fullBaseUrlApi}/${id}`, armorEdited);

    return firstValueFrom(obsHttp$); // toPromise
  }
  // EDIT FAKE
  editFake(id: number, armorEdited: ArmorForm): Promise<any> {
    console.log(armorEdited);

    const obsHttp$ = new Promise((resolve, reject) => {
      if (armorEdited) {
        resolve(armorEdited);
      } else {
        reject(Error('Edit error'));
      }
    });
    console.log("FAKE EDIT : ", obsHttp$);

    return obsHttp$;
  }
  // DELETE BY ID
  deleteById(id: number): Promise<any> {
    const obsHttp$ = this.http
      .delete(`${this.fullBaseUrlApi}/${id}`);

    return firstValueFrom(obsHttp$);
  }
  // DELETE BY ID FAKE
  deleteByIdFake(id: number): Promise<any> {
    const obsHttp$ = this.http
    .get<ArmorHttp>(`${this.fullBaseUrlApi}/${id}`)
    .pipe(
      map((armorHttp: ArmorHttp) => Armor.mapperArmorHttpToArmor(armorHttp))
      );
    console.log("FAKE DELETE : ", firstValueFrom(obsHttp$));
    return firstValueFrom(obsHttp$);
  }
}
