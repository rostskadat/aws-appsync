import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Injectable, PipeTransform } from '@angular/core';
import { SortColumn, SortDirection } from 'frontend/app/directives/ngbd-sortable-header/ngbd-sortable-header.directive';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Catalog } from 'frontend/app/models/catalog';
import { Category } from 'typescript-logging';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'frontend/environments/environment';

/** @internal */
const LOGGER = new Category('CatalogService');

interface SearchResult {
  catalogs: Catalog[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(catalogs: Catalog[], column: SortColumn, direction: string): Catalog[] {
  if (direction === '' || column === '') {
    return catalogs;
  } else {
    return [...catalogs].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(catalog: Catalog, term: string, pipe: PipeTransform) {
  return catalog.name.toLowerCase().includes(term.toLowerCase())
    || (catalog.description && catalog.description.toLowerCase().includes(term.toLowerCase()))
    // || pipe.transform(catalog.description).includes(term);
}

function _createCatalog(input: any) {
  return new Catalog().deserialize(input);
}

export const CATALOGS: Catalog[] = [
  _createCatalog({
    id: 1,
    name: 'Catalog1',
    description: 'Nice catalog description 1'
  }),
  _createCatalog({
    id: 2,
    name: 'Catalog2',
    description: 'Nice catalog description 2'
  }),
  _createCatalog({
    id: 3,
    name: 'Catalog3',
    description: 'Nice catalog description 3'
  }),
  _createCatalog({
    id: 4,
    name: 'Catalog4',
    description: 'Nice catalog description 4'
  }),
  _createCatalog({
    id: 5,
    name: 'Catalog5',
    description: 'Nice catalog description 5'
  }),
  _createCatalog({
    id: 6,
    name: 'Catalog6',
    description: 'Nice catalog description 6'
  }),
  _createCatalog({
    id: 7,
    name: 'Catalog7',
    description: 'Nice catalog description 7'
  }),
  _createCatalog({
    id: 8,
    name: 'Catalog8',
    description: 'Nice catalog description 8'
  }),
  _createCatalog({
    id: 9,
    name: 'Catalog9',
    description: 'Nice catalog description 9'
  }),
  _createCatalog({
    id: 10,
    name: 'Catalog10',
    description: 'Nice catalog description 10'
  }),
  _createCatalog({
    id: 11,
    name: 'Catalog11',
    description: 'Nice catalog description 11'
  }),
  _createCatalog({
    id: 12,
    name: 'Catalog12',
    description: 'Nice catalog description 12'
  }),
  _createCatalog({
    id: 13,
    name: 'Catalog13'
  }),
];
/**
 * The {@link CatalogService} provides functions to call the backend service
 * that implements the Catalog CRUD API
 *
 * ```typescript
 * CatalogService().add(featureNumber, createWAS, createDB, description).subscribe(...)
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  /** @internal */
  private apiUrl: string;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _catalogs$ = new BehaviorSubject<Catalog[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private pipe: DecimalPipe,
    private http: HttpClient) {
    this.apiUrl = environment.apiUrl;

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this.list()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._catalogs$.next(result.catalogs);
      this._total$.next(result.total);
    });

    this._search$.next();

  }

  /**
   * Returns a list of all known catalog present in the cluster
   *
   * @returns The list of catalogs in the Kubernetes cluster
   */
  public list(): Observable<SearchResult> {
    LOGGER.debug(`Listing Catalogs from ${this.apiUrl}/catalogs ...`);
    return this.http.get<SearchResult>(this.apiUrl + '/catalogs');
  }

  /**
   * Returns the catalog whose id matches the given catalog's id
   *
   * @returns The catalog with the matching catalog
   */
  public get(catalog: Catalog): Observable<SearchResult> {
    LOGGER.debug(() => `Getting catalog ${catalog.id}`);
    return this.http.get<SearchResult>(this.apiUrl + '/catalogs/' + catalog.id);
  }

  /**
   * Add a new catalog with the given parameters.
   *
   * @param name the name of the catalog
   * @param description an optional description

   * @returns The newly created catalog
   */
  public add(name: string, description?: string): Observable<SearchResult> {
    const toAdd = { name: name, description: description };
    return this.http.post<SearchResult>(this.apiUrl + '/catalogs', toAdd);
  }

  /**
   * Update the given catalog
   *
   * @param catalog The {@link Catalog} to update
   * @returns The updated catalog
   */
  public update(catalog: Catalog): Observable<SearchResult> {
    LOGGER.debug(`Updating catalog ${catalog.id} ...`)
    return this.http.put<SearchResult>(this.apiUrl + '/catalogs/' + catalog.id, catalog);
  }

  /**
   * Delete the given catalog
   *
   * @param catalog The {@link Catalog} to delete
   * @returns The deleted catalog
   */
  public delete(catalog: Catalog): Observable<SearchResult> {
    return this.http.delete<SearchResult>(this.apiUrl + '/catalogs/' + catalog.id);
  }

  get catalogs$() { return this._catalogs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }

  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }

  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  get searchTerm() { return this._state.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let catalogs = sort(CATALOGS, sortColumn, sortDirection);

    // 2. filter
    catalogs = catalogs.filter(catalog => matches(catalog, searchTerm, this.pipe));
    const total = catalogs.length;

    // 3. paginate
    catalogs = catalogs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({catalogs, total});
  }
}
