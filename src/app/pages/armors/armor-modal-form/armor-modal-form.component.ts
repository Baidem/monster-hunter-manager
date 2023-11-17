import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Armor, ArmorForm } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';

@Component({
  selector: 'app-armor-modal-form',
  templateUrl: './armor-modal-form.component.html',
  styleUrls: ['./armor-modal-form.component.css']
})
export class ArmorModalFormComponent {

  // PROPERTIES
  armor$?: Promise<Armor>
  armors$?: Observable<Armor[]>;
  armorForm?: FormGroup;
  selectedElementForEdition?: Armor;
  @ViewChild('modalForm') modalForm!: ElementRef;

  // CONSTRUCTOR
  constructor (
    private armorService: ArmorService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // OUTPUT
  @Output() refreshArmorPromise: EventEmitter<number> = new EventEmitter<number>()
  @Output() refreshArmorsObservable: EventEmitter<any> = new EventEmitter<any>()

  // TRIGGER ADD ELEMENT
  triggerAddElement(): void {
    this.initArmorForm();

    const modal = this.modalService.open(this.modalForm, { size: 'lg', backdrop: 'static' });

    modal.result
    .then(() => {
      const elementForm: ArmorForm = {
        ...this.armorForm?.value,
      };
      console.log("elementForm", elementForm);

      this.armorService.addFake(elementForm).then(() => {
        this.refreshArmorsObservable.emit()
      });
    })
    .catch(() => {

    });
  }

  // TRIGGER EDIT ELEMENT
  triggerEditElement(elementToEdit: Armor, isDetailsComponent: boolean) {
    this.initArmorForm(elementToEdit);
    this.selectedElementForEdition = elementToEdit;
    const modal = this.modalService.open(this.modalForm, { size: 'lg', backdrop: 'static' });

    modal.result
    .then(() => {
      const elementForm: ArmorForm = {
        ...this.armorForm?.value,
      };

      this.armorService.editFake(elementToEdit.id, elementForm).then(() => {
        if (isDetailsComponent) this.refreshArmorPromise.emit(this.selectedElementForEdition!.id)
        else this.refreshArmorsObservable.emit()
          this.selectedElementForEdition = undefined;
        });
      })
      .catch(() => {
        this.selectedElementForEdition = undefined;
      });
  }
  // ON SUBMIT ELEMENT FORM
  onSubmitElementForm(modal: any){
    if(this.armorForm?.valid){
      modal.close();
    }
  }
  // INIT ARMOR FORM
  private initArmorForm(armorToEdit?: Armor): void {
    this.armorForm = this.fb.group({
      name: [armorToEdit ? armorToEdit.name : undefined, [Validators.required]],
      type: [armorToEdit ? armorToEdit.type : undefined, [Validators.required]],
      rank: [armorToEdit ? armorToEdit.rank : undefined, [Validators.required]],
      rarity: [armorToEdit ? armorToEdit.rarity : undefined, [Validators.required]],

      defenseBase: [armorToEdit ? armorToEdit.defense.base : undefined, [Validators.required]],
      defenseMax: [armorToEdit ? armorToEdit.defense.max : undefined, [Validators.required]],
      defenseAugmented: [armorToEdit ? armorToEdit.defense.augmented : undefined, [Validators.required]],

      resistancesFire: [armorToEdit ? armorToEdit.resistances.fire : undefined, [Validators.required]],
      resistancesWater: [armorToEdit ? armorToEdit.resistances.water : undefined, [Validators.required]],
      resistancesIce: [armorToEdit ? armorToEdit.resistances.ice : undefined, [Validators.required]],
      resistancesThunder: [armorToEdit ? armorToEdit.resistances.thunder : undefined, [Validators.required]],
      resistancesDragon: [armorToEdit ? armorToEdit.resistances.dragon : undefined, [Validators.required]],

      armorSetId: [armorToEdit ? armorToEdit.armorSet.id : undefined, [Validators.required]],

      imageMale: [armorToEdit ? armorToEdit.imageMale : undefined], // optional
      imageFemale: [armorToEdit ? armorToEdit.imageFemale : undefined], // optional
    });
  }

}
