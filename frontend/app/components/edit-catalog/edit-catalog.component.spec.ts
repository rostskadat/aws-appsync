import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditCatalogComponent } from './edit-catalog.component';

describe('EditCatalogComponent', () => {
  let component: EditCatalogComponent;
  let fixture: ComponentFixture<EditCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCatalogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    const event = {}; // createNewEvent('input');
    input.value = 'new description';
    input.dispatchEvent(event);
    expect(component.description.value).toEqual('new description');
  });

  it('should update the value in the control', () => {
    component.description.setValue('new description');
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('new description');
  });

});
