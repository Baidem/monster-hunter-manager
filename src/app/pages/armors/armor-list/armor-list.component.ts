import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map } from 'rxjs';
import { Armor } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';
import { ArmorModalFormComponent } from '../armor-modal-form/armor-modal-form.component';
import { ModalDeleteElementComponent } from 'src/app/components/modal-delete-element/modal-delete-element.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faManatSign, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrls: ['./armor-list.component.css'],
})
export class ArmorListComponent implements OnInit {
  // PROPERTIES
  iconAdd: IconDefinition = faPlus;
  iconSearch: IconDefinition = faMagnifyingGlass;
  armors$?: Observable<Armor[]>;
  loadingArmors = true;
  selectedElementDeleteConfirmation?: Armor;
  showDeleteSuccessToast: boolean = false;
  selectedElementForEdition?: Armor;
  armorForm?: FormGroup;
  private searchFilterText$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);

  @ViewChild(ArmorModalFormComponent) armorModalForm!: ArmorModalFormComponent;
  @ViewChild(ModalDeleteElementComponent) modalDeleteViewChild!: ModalDeleteElementComponent;

  // CONSTRUCTOR
  constructor(
    private armorService: ArmorService,
  ) {}

  // ON INIT
  ngOnInit(): void {
    this.refreshArmorsObservable();
  }
  // ON INPUT SEARCH FILTER
  onInputSearchFilter(evt: any): void {
    const searchText = evt.target.value;
    this.searchFilterText$.next(searchText);
  }
  // ON CLICK ADD ELEMENT
  onClickAddElement() {
    this.armorModalForm.triggerAddElement();
  }
  // ON CLICK EDIT ELEMENT
  onClickEditElement(elementToEdit: Armor) {
    this.armorModalForm.triggerEditElement(elementToEdit, false);
  }
  // ON CLICK DELETE BUTTON
  onClickDeleteButton(armor: Armor): void {
    this.selectedElementDeleteConfirmation = armor
    this.modalDeleteViewChild.triggerDeleteModal();
  }
  // DELETE ELEMENT
  deleteElement(): void {
    const id = this.selectedElementDeleteConfirmation?.id;
    if(id){
      this.armorService.deleteByIdFake(id).then(() => {
        this.showDeleteSuccessToast = true;
        this.refreshArmorsObservable();
      }).catch(() => {});
    }
    this.selectedElementDeleteConfirmation = undefined;
  }
  // ON SUBMIT ELEMENT FORM
  onSubmitElementForm(modal: any){
    if(this.armorForm?.valid){
      modal.close();
    }
  }
  // REFRESH ARMORS OBSERVABLE
  refreshArmorsObservable() {
    this.loadingArmors = true;
    this.armors$ = this.getElementsFiltered();
    this.armors$?.subscribe((armors) => {
      console.log(armors.length + " armors have been loaded");
      this.loadingArmors = false;
    });
  }

  // GET ARMOR FILTERED
  private getElementsFiltered(): Observable<Armor[]> {
    return combineLatest([
      this.armorService.getAll(),
      this.searchFilterText$,
    ]).pipe(
      debounceTime(500),
      map(([armors, searchText]) => {
        if (searchText) {
          return armors.filter(
            (a) =>
              a.name.toLowerCase().includes(searchText.toLowerCase()) ||
              a.type.toLowerCase().includes(searchText.toLowerCase()) ||
              a.rank.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return armors;
      })
    );
  }

}
