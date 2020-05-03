import { Category } from 'typescript-logging';
import { Component } from '@angular/core';
import { GlobalStateService } from 'frontend/app/services/global-state/global-state.service';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Toast } from 'angular2-toaster';
import { ToasterConfig } from 'angular2-toaster';
import { ToasterService } from 'angular2-toaster';

/** @internal */
const LOGGER = new Category('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ToasterService
  ],
})
export class AppComponent implements OnInit {
  
  title = 'Catalogs';

  public toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    animation: 'fade',
    timeout: 2000
  });

  public constructor(
    private titleService: Title,
    private state: GlobalStateService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    LOGGER.info('Initializing...');
    this.titleService.setTitle(this.title);
    this.state.subscribe('popToast', (toast: Toast) => {
      this.toasterService.pop(toast);
    })
  }
}
