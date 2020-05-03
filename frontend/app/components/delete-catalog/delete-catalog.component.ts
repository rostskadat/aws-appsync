import { Catalog } from 'frontend/app/models/catalog';
import { CatalogService } from 'frontend/app/services/catalog/catalog.service';
import { Category } from 'typescript-logging';
import { Component } from '@angular/core';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/** @internal */
const LOGGER = new Category('DeleteCatalogComponent');

@Component({
  selector: 'app-delete-catalog',
  templateUrl: './delete-catalog.component.html',
  styleUrls: ['./delete-catalog.component.scss']
})
export class DeleteCatalogComponent {

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

  onOK() {
    LOGGER.debug(`Deleting Catalog ${this.catalog.id} ... `);
    this.modalRef.close();
    this.catalogService
      .delete(this.catalog)
      .subscribe(
        _ => () => {
          this.state.notifyDataChanged('popToast', { type: 'warning', title: 'Error', body: 'Failed to delete catalog' });
        },
        () => {
          this.state.notifyDataChanged('popToast', { type: 'success', title: 'Success', body: 'Catalog deleted' });
          this.state.notifyDataChanged('onForceReload', true);
        }
      );
  }
}
