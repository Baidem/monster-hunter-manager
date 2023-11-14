import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map } from 'rxjs';
import { Armor, ArmorForm } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';

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

  // CONSTRUCTOR
  constructor(
    private armorService: ArmorService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  // ON INIT
  ngOnInit(): void {
    this.armors$ = this.getElementsFiltered();
  }
  // ON INPUT SEARCH FILTER
  onInputSearchFilter(evt: any): void {
    const searchText = evt.target.value;
    this.searchFilterText$.next(searchText);
  }
  // ON CLICK ADD ELEMENT
  onClickAddElement(modalElementForm: any): void {
    this.initArmorForm();
    const modal = this.modalService.open(modalElementForm);

    modal.result
      .then(() => {
        const elementForm: ArmorForm = {
          ...this.armorForm?.value,
        };

        this.armorService.add(elementForm).then(() => {
          this.armors$ = this.getElementsFiltered();
        });
      })
      .catch(() => {});
  }
  // ON CLICK EDIT ELEMENT
  onClickEditElement(modalUserForm: any, elementToEdit: Armor): void {
    this.initArmorForm(elementToEdit);
    this.selectedElementForEdition = elementToEdit;
    const modal = this.modalService.open(modalUserForm);

    modal.result
      .then(() => {
        const elementForm: ArmorForm = {
          ...this.armorForm?.value,
        };

        this.armorService.edit(elementToEdit.id, elementForm).then(() => {
          this.armors$ = this.getElementsFiltered();
          this.selectedElementForEdition = undefined;
        });
      })
      .catch(() => {
        this.selectedElementForEdition = undefined;
      });
  }
  // ON CLICK DELETE ELEMENT
  onClickDeleteElement(modalDelete: any, armor: Armor): void {
    this.selectedElementDeleteConfirmation = armor;

    const modal = this.modalService.open(modalDelete);

    modal.result
      .then(() => {
        this.armorService.deleteById(armor.id).then(() => {
          this.showDeleteSuccessToast = true;
          this.armors$ = this.getElementsFiltered();
        });
      })
      .catch(() => {});
  }
  // INIT ARMOR FORM
  private initArmorForm(armorToEdit?: Armor): void {
    this.armorForm = this.fb.group({
      type: [armorToEdit ? armorToEdit.type : undefined, [Validators.required]],
      rank: [armorToEdit ? armorToEdit.rank : undefined, [Validators.required]],
      rarity: [
        armorToEdit ? armorToEdit.rarity : undefined,
        [Validators.required],
      ],
      name: [armorToEdit ? armorToEdit.name : undefined, [Validators.required]],
      armorSetId: [
        armorToEdit ? armorToEdit.armorSet.id : undefined,
        [Validators.required],
      ],
      imageMale: [
        armorToEdit ? armorToEdit.assets.imageMale : undefined,
        [Validators.required],
      ],
      imageFemale: [
        armorToEdit ? armorToEdit.assets.imageFemale : undefined,
        [Validators.required],
      ],
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
