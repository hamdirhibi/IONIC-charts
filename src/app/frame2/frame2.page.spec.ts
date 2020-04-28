import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame2Page } from './frame2.page';

describe('Frame2Page', () => {
  let component: Frame2Page;
  let fixture: ComponentFixture<Frame2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Frame2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Frame2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
