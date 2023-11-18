import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Armor } from 'src/app/models/armor.model';

@Component({
  selector: 'app-armor-card',
  templateUrl: './armor-card.component.html',
  styleUrls: ['./armor-card.component.css']
})
export class ArmorCardComponent {

  @Input() armorInput!: Armor;

  @Output() editElement: EventEmitter<Armor> = new EventEmitter<Armor>()
  @Output() deletedElement: EventEmitter<Armor> = new EventEmitter<Armor>()

  onClickEditElement () {
    this.editElement.emit(this.armorInput)
  }

  onClickDeleteElement () {
    this.deletedElement.emit(this.armorInput)
  }
}
