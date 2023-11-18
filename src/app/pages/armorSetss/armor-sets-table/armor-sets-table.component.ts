import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map } from 'rxjs';
import { ArmorSets } from 'src/app/models/armor-sets.model';
import { ArmorSetsService } from 'src/app/services/armorSets/armor-sets.service';

@Component({
  selector: 'app-armor-sets-table',
  templateUrl: './armor-sets-table.component.html',
  styleUrls: ['./armor-sets-table.component.css']
})
export class ArmorSetsTableComponent implements OnInit {

  // PROPERTIES
  iconSearch: IconDefinition = faMagnifyingGlass;
  armorsSets$?: Observable<ArmorSets[]>;
  loadingArmorsSets = true;

  openbyIdSet: number = -1;

  private searchFilterText$: BehaviorSubject<string | undefined> =
  new BehaviorSubject<string | undefined>(undefined);

  // CONSTRUCTOR
  constructor(
    private armorSetsService: ArmorSetsService,
  ) {}

  // ON INIT
  ngOnInit(): void {
    this.refreshArmorsSetsObservable();
  }

  onClickPieces(id: number) {
    this.openbyIdSet = id === this.openbyIdSet ? -1 : id;
  }

  // ON INPUT SEARCH FILTER
  onInputSearchFilter(evt: any): void {
    const searchText = evt.target.value;
    this.searchFilterText$.next(searchText);
  }
  // REFRESH ARMORS SETS OBSERVABLE
  refreshArmorsSetsObservable() {
    this.loadingArmorsSets = true;
    this.armorsSets$ = this.getElementsFiltered();
    this.armorsSets$?.subscribe((armorsSets) => {
      console.log(armorsSets.length + " armors sets have been loaded");
      this.loadingArmorsSets = false;
    });
  }
  // GET ARMOR FILTERED
  private getElementsFiltered(): Observable<ArmorSets[]> {
    return combineLatest([
      this.armorSetsService.getAll(),
      this.searchFilterText$,
    ]).pipe(
      debounceTime(500),
      map(([armorsSets, searchText]) => {
        if (searchText) {
          return armorsSets.filter(
            (a) =>
              a.name.toLowerCase().includes(searchText.toLowerCase()) ||
              a.rank.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return armorsSets;
      })
    );
  }
}
