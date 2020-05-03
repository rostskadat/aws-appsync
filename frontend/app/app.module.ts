import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { CategoryConfiguration, CategoryServiceFactory, LogLevel } from 'typescript-logging';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'frontend/app/app.component';
import { AppRoutingModule } from 'frontend/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogsViewComponent } from 'frontend/app/components/catalogs-view/catalogs-view.component';
import { FilterOnAttributesPipe } from 'frontend/app/pipes/filter-on-attributes/filter-on-attributes.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderDirective } from 'frontend/app/directives/ngbd-sortable-header/ngbd-sortable-header.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsViewComponent } from 'frontend/app/components/settings-view/settings-view.component';
import { ToasterModule } from 'angular2-toaster';
import { TopBarComponent } from 'frontend/app/components/top-bar/top-bar.component';
import { ViewCatalogComponent } from 'frontend/app/components/view-catalog/view-catalog.component';
import { environment } from 'frontend/environments/environment';

export const routes: Routes = [
  { path: '',         component: CatalogsViewComponent },
  { path: 'catalogs', component: CatalogsViewComponent },
  { path: 'catalogs/:id', component: ViewCatalogComponent },
  { path: 'settings', component: SettingsViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FilterOnAttributesPipe,
    TopBarComponent,
    CatalogsViewComponent,
    NgbdSortableHeaderDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToasterModule.forRoot(),
  ],
  providers: [
    AsyncPipe,
    DecimalPipe,
  ],
  exports: [CatalogsViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));
