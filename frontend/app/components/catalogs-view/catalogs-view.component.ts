import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeaderDirective, SortEvent } from 'frontend/app/directives/ngbd-sortable-header/ngbd-sortable-header.directive';
import { Observable, interval } from 'rxjs';
import { faEdit, faSignInAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Catalog } from 'frontend/app/models/catalog';
import { CatalogService } from 'frontend/app/services/catalog/catalog.service';
import { Category } from 'typescript-logging';
import { DeleteCatalogComponent } from 'frontend/app/components/delete-catalog/delete-catalog.component';
import { EditCatalogComponent } from 'frontend/app/components/edit-catalog/edit-catalog.component';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCatalogComponent } from 'frontend/app/components/view-catalog/view-catalog.component';
import { map } from 'rxjs/operators';

/** @internal */
const LOGGER = new Category('CatalogsViewComponent');

/**
 * The {@link CatalogsViewComponent} implements the list of catalogs found
 * in the backend
 *
 */
@Component({
  selector: 'app-catalogs-view',
  templateUrl: './catalogs-view.component.html',
  styleUrls: ['./catalogs-view.component.scss'],
  providers: [
    AsyncPipe,
    CatalogService,
    DecimalPipe,
  ],
})
export class CatalogsViewComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  catalogs$: Observable<Catalog[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    public catalogService: CatalogService,
    private modalService: NgbModal) {
      this.catalogs$ = catalogService.catalogs$;
      this.total$ = catalogService.total$;
    }

  ngOnInit(): void {
    LOGGER.debug("Initialization...")
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.catalogService.sortColumn = column;
    this.catalogService.sortDirection = direction;
  }

  onEdit(catalog: Catalog) {
    const modalRef = this.modalService.open(EditCatalogComponent);
    (modalRef.componentInstance as EditCatalogComponent).catalog = catalog;
    (modalRef.componentInstance as EditCatalogComponent).modalRef = modalRef;
  }

  onDelete(catalog: Catalog) {
    const modalRef = this.modalService.open(DeleteCatalogComponent);
    (modalRef.componentInstance as DeleteCatalogComponent).catalog = catalog;
    (modalRef.componentInstance as DeleteCatalogComponent).modalRef = modalRef;
  }
}
