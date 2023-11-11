import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyEventComponent } from './buy-event.component';

describe('BuyEventComponent', () => {
  let component: BuyEventComponent;
  let fixture: ComponentFixture<BuyEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyEventComponent]
    });
    fixture = TestBed.createComponent(BuyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
