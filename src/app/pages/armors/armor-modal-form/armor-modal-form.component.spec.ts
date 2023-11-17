import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorModalFormComponent } from './armor-modal-form.component';

describe('ArmorModalFormComponent', () => {
  let component: ArmorModalFormComponent;
  let fixture: ComponentFixture<ArmorModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmorModalFormComponent]
    });
    fixture = TestBed.createComponent(ArmorModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
