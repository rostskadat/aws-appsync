import { FormControl, FormGroup } from '@angular/forms';

import { Catalog } from 'frontend/app/models/catalog';
import { CatalogService } from 'frontend/app/services/catalog/catalog.service';
import { Category } from 'typescript-logging';
import { Component } from '@angular/core';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/** @internal */
const LOGGER = new Category('EditCatalogComponent');

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.scss']
})
export class EditCatalogComponent {

  /**
   * `modalRef` is a {@link NgbModalRef} on the dialog opened by {@link NgbModal} `open` method. It is used to programatically close the dialog
   */
  public modalRef: NgbModalRef;
  public catalog: Catalog;

  constructor(
    public modal: NgbActiveModal,
    private catalogService: CatalogService,
    private state: GlobalStateService,
  ) { }

  onSubmit(newDescription: string) {
    LOGGER.debug(`Updating Catalog ${this.catalog.id}  with description '${newDescription}' ... `);
    this.catalog.description = newDescription;
    this.modalRef.close();
    this.catalogService
      .update(this.catalog)
      .subscribe(
        _ => () => {
          this.state.notifyDataChanged('popToast', { type: 'warning', title: 'Error', body: 'Failed to update catalog' });
        },
        () => {
          this.state.notifyDataChanged('popToast', { type: 'success', title: 'Success', body: 'Catalog updated' });
          this.state.notifyDataChanged('onForceReload', true);
        }
      );

  }
}
