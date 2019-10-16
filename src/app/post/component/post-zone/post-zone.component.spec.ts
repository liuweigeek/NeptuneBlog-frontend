import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostZoneComponent } from './post-zone.component';

describe('PostZoneComponent', () => {
  let component: PostZoneComponent;
  let fixture: ComponentFixture<PostZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
