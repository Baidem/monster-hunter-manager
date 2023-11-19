import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Armor } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';
import { ArmorModalFormComponent } from '../armor-modal-form/armor-modal-form.component';
import { ModalDeleteElementComponent } from 'src/app/components/modal-delete-element/modal-delete-element.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeftLong, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-armor-details',
  templateUrl: './armor-details.component.html',
  styleUrls: ['./armor-details.component.css']
})
export class ArmorDetailsComponent {

  // PROPERTIES
  armor$?: Promise<Armor>
  selectedElementDeleteConfirmation?: Armor;
  showDeleteSuccessToast: boolean = false;
  armorForm?: FormGroup;
  modalOpened = false;
  iconBack: IconDefinition = faArrowLeftLong;
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrash;

  @ViewChild(ArmorModalFormComponent) armorModalForm!: ArmorModalFormComponent;
  @ViewChild(ModalDeleteElementComponent) modalDeleteViewChild!: ModalDeleteElementComponent;

  // CONSTRUCTOR
  constructor (
    private armorService: ArmorService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  // ON INIT
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');

    if (id) {
      this.armor$ = this.armorService.getById(parseInt(id));
    }
    else {
      this.router.navigateByUrl('/not-found');
    }
  }
  // ON CLICK EDIT ELEMENT
  onClickEditElement(elementToEdit: Armor) {
    this.armorModalForm.triggerEditElement(elementToEdit, true);
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
        setTimeout(() => {
          this.router.navigate(['/armor']);
        }, 4000);
      }).catch(() => {});
    }
    this.selectedElementDeleteConfirmation = undefined;
  }
  // REFRESH ARMOR PROMISE
  refreshArmorPromise(id: number){
    this.armor$ = this.armorService.getById(id);
  }
}
