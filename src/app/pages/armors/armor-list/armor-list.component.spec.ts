import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorListComponent } from './armor-list.component';

describe('ArmorListComponent', () => {
  let component: ArmorListComponent;
  let fixture: ComponentFixture<ArmorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmorListComponent]
    });
    fixture = TestBed.createComponent(ArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
