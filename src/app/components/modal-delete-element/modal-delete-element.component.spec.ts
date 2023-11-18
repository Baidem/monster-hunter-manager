import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteElementComponent } from './modal-delete-element.component';

describe('ModalDeleteElementComponent', () => {
  let component: ModalDeleteElementComponent;
  let fixture: ComponentFixture<ModalDeleteElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteElementComponent]
    });
    fixture = TestBed.createComponent(ModalDeleteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
