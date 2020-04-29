import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectorComponent } from './single-selector.component';

describe('SingleSelectorComponent', () => {
  let component: SingleSelectorComponent;
  let fixture: ComponentFixture<SingleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
