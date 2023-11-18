import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { ArmorSets, ArmorSetsHttp } from 'src/app/models/armor-sets.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArmorSetsService {
  // Url api : 'https://mhw-db.com/armor/sets'
  private baseUrlApi: string = environment.API_URL;
  private resourceName: string = 'armor/sets';
  private fullBaseUrlApi: string;

  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName;
  }

  // GET ALL
  getAll(): Promise<ArmorSets[]> {
    const obsHttp$ = this.http
    .get<ArmorSetsHttp[]>(`${this.fullBaseUrlApi}`)
    .pipe(
      map((armorsSetsHttp: ArmorSetsHttp[]) => armorsSetsHttp.map((armorSetsHttp: ArmorSetsHttp) => ArmorSets.mapperArmorSetsHttpToArmorSets(armorSetsHttp)))
      );
    return firstValueFrom(obsHttp$);
  }
    // GET BY ID
    getById(id: number): Promise<ArmorSets> {
      const obsHttp$ = this.http
        .get<ArmorSetsHttp>(`${this.fullBaseUrlApi}/${id}`)
        .pipe(
          map((armorSetsHttp: ArmorSetsHttp) => ArmorSets.mapperArmorSetsHttpToArmorSets(armorSetsHttp))
      );
      return firstValueFrom(obsHttp$);
    }


}
