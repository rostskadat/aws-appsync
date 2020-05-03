import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCatalogComponent } from './delete-catalog.component';

describe('DeleteCatalogComponent', () => {
  let component: DeleteCatalogComponent;
  let fixture: ComponentFixture<DeleteCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
