import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetsDetailsComponent } from './armor-sets-details.component';

describe('ArmorSetsDetailsComponent', () => {
  let component: ArmorSetsDetailsComponent;
  let fixture: ComponentFixture<ArmorSetsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmorSetsDetailsComponent]
    });
    fixture = TestBed.createComponent(ArmorSetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
