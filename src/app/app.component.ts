import { Component, OnInit } from '@angular/core';
import { MultipleSelectorComponent } from './multiple-selector/multiple-selector.component';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { SingleSelectorComponent } from './single-selector/single-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedPortal: Portal<any>;

  ngOnInit(): void {
    this.selectedPortal = new ComponentPortal(SingleSelectorComponent);
  }

  // Select Single Or Multiple Selection configurator
  selectionChange(event) {
    (event.checked === true) ?
      this.selectedPortal = new ComponentPortal(MultipleSelectorComponent) :
      this.selectedPortal = new ComponentPortal(SingleSelectorComponent);
  }


}
