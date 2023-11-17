import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Armor } from 'src/app/models/armor.model';
import { ArmorService } from 'src/app/services/armor/armor.service';
import { ArmorModalFormComponent } from '../armor-modal-form/armor-modal-form.component';

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

  @ViewChild(ArmorModalFormComponent) armorModalForm!: ArmorModalFormComponent;

  // CONSTRUCTOR
  constructor (
    private armorService: ArmorService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  // ON INIT
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');

    if (id) {
      this.armor$ = this.armorService.getById(parseInt(id));
      console.log(this.armor$);
    }
    else {
      this.router.navigateByUrl('/not-found');
    }
  }
  // ON CLICK EDIT ELEMENT
  onClickEditElement(elementToEdit: Armor) {
    this.armorModalForm.triggerEditElement(elementToEdit, true);
  }
  // ON CLICK DELETE ELEMENT
  onClickDeleteElement(modalDelete: any, armor: Armor): void {
    this.selectedElementDeleteConfirmation = armor;

    const modal = this.modalService.open(modalDelete);

    modal.result
      .then(() => {
        this.armorService.deleteByIdFake(armor.id).then(() => {
          this.showDeleteSuccessToast = true;
          setTimeout(() => {
            this.router.navigate(['/armor']);
          }, 4000);
        });
      })
      .catch(() => {});
  }
  // REFRESH ARMOR PROMISE
  refreshArmorPromise(id: number){
    this.armor$ = this.armorService.getById(id);
  }
}
