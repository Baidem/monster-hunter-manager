import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-element',
  templateUrl: './modal-delete-element.component.html',
  styleUrls: ['./modal-delete-element.component.css']
})
export class ModalDeleteElementComponent {

  modal: any;
  @Input() name?: string;
  @ViewChild('modalDelete') modalDelete!: ElementRef;

  // CONSTRUCTOR
  constructor (
    private modalService: NgbModal,
  ) {}

  @Output() deleteElement: EventEmitter<any> = new EventEmitter<any>()

  // TRIGGER DELETE MODAL
  triggerDeleteModal(): void {
    this.modal = this.modalService.open(this.modalDelete);

    this.modal.result
      .then(() => { this.deleteElement.emit() })
      .catch(() => {});
  }
}
