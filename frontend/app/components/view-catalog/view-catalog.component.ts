import { ActivatedRoute, Router } from '@angular/router';

import { Catalog } from 'frontend/app/models/catalog';
import { CatalogService } from 'frontend/app/services/catalog/catalog.service';
import { Category } from 'typescript-logging';
import { Component } from '@angular/core';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { OnInit } from '@angular/core';

/** @internal */
const LOGGER = new Category('ViewCatalogComponent');

@Component({
  selector: 'app-view-catalog',
  templateUrl: './view-catalog.component.html',
  styleUrls: ['./view-catalog.component.scss']
})
export class ViewCatalogComponent implements OnInit {

  public catalog: Catalog;
  public catalogId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private state: GlobalStateService,
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["id"]) {
        LOGGER.debug("Editing catalog ..." + params["id"])
        this.catalogId = params["id"]
      }
    });
  }

  ngOnInit(): void {
    LOGGER.debug("Initialization...")
  }

}
