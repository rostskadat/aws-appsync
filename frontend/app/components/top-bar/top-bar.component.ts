import { Component, OnInit } from '@angular/core';

import { Category } from 'typescript-logging';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTools } from '@fortawesome/free-solid-svg-icons';

/** @internal */
const LOGGER = new Category('TopBarComponent');

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  filter: string;

  /** @internal */
  faTools = faTools

  ngOnInit(): void {
    LOGGER.debug("Initialization...")
  }

  constructor(private state: GlobalStateService, private modalService: NgbModal) { }

  onAddContainer() {
    // const modalRef = this.modalService.open(AddContainerComponent);
    // (modalRef.componentInstance as AddContainerComponent).modalRef = modalRef;
  }

  onFilterChanged() {
    // the value is also accessible through event.target.value
    this.state.notifyDataChanged('onFilterChanged', this.filter);
  }
}
