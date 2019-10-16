import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBoxComponent } from './send-box.component';

describe('SendBoxComponent', () => {
  let component: SendBoxComponent;
  let fixture: ComponentFixture<SendBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
