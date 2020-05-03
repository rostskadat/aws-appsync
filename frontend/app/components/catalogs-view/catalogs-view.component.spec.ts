import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsViewComponent } from './catalogs-view.component';

describe('CatalogsViewComponent', () => {
  let component: CatalogsViewComponent;
  let fixture: ComponentFixture<CatalogsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
