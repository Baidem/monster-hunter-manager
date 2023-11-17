import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map } from 'rxjs';
import { Armor, ArmorForm } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';
import { ArmorModalFormComponent } from '../armor-modal-form/armor-modal-form.component';

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrls: ['./armor-list.component.css'],
})
export class ArmorListComponent implements OnInit {
  // PROPERTIES
  armors$?: Observable<Armor[]>;
  selectedElementDeleteConfirmation?: Armor;
  showDeleteSuccessToast: boolean = false;
  selectedElementForEdition?: Armor;
  armorForm?: FormGroup;
  private searchFilterText$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);

    @ViewChild(ArmorModalFormComponent) armorModalForm!: ArmorModalFormComponent;

  // CONSTRUCTOR
  constructor(
    private armorService: ArmorService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  // ON INIT
  ngOnInit(): void {
    this.armors$ = this.getElementsFiltered();
    console.log(this.armors$);
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
  // ON CLICK DELETE ELEMENT
  onClickDeleteElement(modalDelete: any, armor: Armor): void {
    this.selectedElementDeleteConfirmation = armor;

    const modal = this.modalService.open(modalDelete);

    modal.result
      .then(() => {
        this.armorService.deleteByIdFake(armor.id).then(() => {
          this.showDeleteSuccessToast = true;
          this.armors$ = this.getElementsFiltered();
        });
      })
      .catch(() => {});
  }
  // ON SUBMIT ELEMENT FORM
  onSubmitElementForm(modal: any){
    if(this.armorForm?.valid){
      modal.close();
    }
  }
  // REFRESH ARMORS OBSERVABLE
  refreshArmorsOservable(){
    this.armors$ = this.getElementsFiltered();
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
