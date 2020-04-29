import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CountryInterface, Countries } from '../interfaces/country/country.interface';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.scss']
})
export class MultipleSelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  MultipleSelectorLabel = 'Select Multiple Countries';

  // Multiple selections inputs
  countryData: CountryInterface[] = Countries;
  multipleSearchFunction = false;
  close = false;
  allSelected: boolean;
  selectAll = false;
  protected onDestroy = new Subject<void>();
  information: CountryInterface[];
  countryMultiCtrl: FormControl = new FormControl();
  countryMultiFilterCtrl: FormControl = new FormControl();
  filteredCountriesMulti: ReplaySubject<CountryInterface[]> = new ReplaySubject<CountryInterface[]>(1);
  @ViewChild('multipleSelect') multipleSelect: MatSelect;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Multiple selection
    this.countryMultiCtrl.setValue(this.countryData[250]);
    this.filteredCountriesMulti.next(this.countryData.slice());
    this.countryMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.filterMultipleCountries();
      });
  }

  ngAfterViewInit() {
    this.setInit();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  /**
   * Set initial state
   */
  protected setInit() {
    this.filteredCountriesMulti.pipe(take(1), takeUntil(this.onDestroy)).subscribe(() => {
      this.multipleSelect.compareWith = (a: CountryInterface, b: CountryInterface) => a && b && a.name === b.name;
    });
  }

  /**
   *
   * tslint:disable-next-line:no-redundant-jsdoc
   * @param event
   */
  onMultipleSelection(event: MatSelectChange) {
    this.information = event.value;
    this.closeWindow();
  }

  /**
   * Multiple Countries filter
   */
  protected filterMultipleCountries(): void {
    if (!this.countryData) { return; }
    // get the search keyword
    let search = this.countryMultiFilterCtrl.value;
    if (!search) {
      this.filteredCountriesMulti.next(this.countryData.slice());
      return;
    } else { search = search.toLowerCase(); }
    // filter
    this.filteredCountriesMulti.next(
      this.countryData.filter(country => country.name.toLowerCase().indexOf(search) > -1)
    );
  }

  /**
   * Select all countries/items configurator
   */
  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;
    // Select all options
    (this.allSelected) ?
      this.multipleSelect.options.forEach((item) => item.select()) :
      this.multipleSelect.options.forEach((item) => item.deselect());
    this.closeWindow();
  }

  /**
   * Search functionality
   * @param event
   */
  enableSearch(event) {
    (event.checked === true) ?
      this.multipleSearchFunction = true :
      this.multipleSearchFunction = false;
  }

  /**
   * Close after selection configurator
   * @param event
   */
  closeOnChange(event) {
    (event.checked === true) ? this.close = true : this.close = false;
  }

  /**
   * Close window
   */
  closeWindow() {
    (this.close === true) ? this.multipleSelect.close() : this.multipleSelect.focus();
  }

  /**
   * Select all on change
   * @param event
   */
  selectAllOnChange(event) {
    (event.checked === true) ? this.selectAll = true : this.selectAll = false;
  }


}
