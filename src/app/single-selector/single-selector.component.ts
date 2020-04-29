import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CountryInterface, Countries } from '../interfaces/country/country.interface';

@Component({
  selector: 'app-single-selector',
  templateUrl: './single-selector.component.html',
  styleUrls: ['./single-selector.component.scss']
})
export class SingleSelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  SelectorLabel = 'Select Countries';
  countryListing: CountryInterface[] = Countries;
  search = false;
  close = false;
  selectedInformation: CountryInterface;
  // Single selection
  countryCtrl: FormControl = new FormControl();
  countryFilterCtrl: FormControl = new FormControl();
  filteredCountries: ReplaySubject<CountryInterface[]> = new ReplaySubject<CountryInterface[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.countryCtrl.setValue(this.countryListing[250]);
    this.filteredCountries.next(this.countryListing.slice());
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.filterCountries();
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
   * Set Initial state
   */
  protected setInit() {
    this.filteredCountries.pipe(take(1), takeUntil(this.onDestroy)).subscribe(() => {
      this.singleSelect.compareWith = (a: CountryInterface, b: CountryInterface) => a && b && a.name === b.name;
    });
  }

  /**
   * Single country filter
   */
  protected filterCountries() {
    if (!this.countryListing) {
      return;
    }
    // get the search keyword
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countryListing.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredCountries.next(
      this.countryListing.filter(country => country.name.toLowerCase().indexOf(search) > -1)
    );
  }

  /**
   * On single selection
   * @param MatSelectChange event
   */
  onSingleSelection(event: MatSelectChange) {
    this.selectedInformation = event.value;
  }

  // Search functionality
  enableSearch(event) {
    (event.checked === true) ?
      this.search = true :
      this.search = false;
  }

  // Close after selection configurator
  closeOnChange(event) {
    (event.checked === true) ? this.close = true : this.close = false;
  }

  closeWindow() {
    // Close after selection
    (this.close === true) ? this.singleSelect.close() : this.singleSelect.focus();
  }

}
