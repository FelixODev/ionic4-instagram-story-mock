import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPage } from './story.page';

describe('StoryPage', () => {
  let component: StoryPage;
  let fixture: ComponentFixture<StoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
