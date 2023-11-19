import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSetsTableComponent } from './armor-sets-table.component';

describe('ArmorSetsTableComponent', () => {
  let component: ArmorSetsTableComponent;
  let fixture: ComponentFixture<ArmorSetsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmorSetsTableComponent]
    });
    fixture = TestBed.createComponent(ArmorSetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
