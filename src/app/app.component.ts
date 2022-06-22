import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [  ]
})
export class AppComponent {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  phoneForm = new FormGroup({
    phone: new FormControl("", [Validators.required])
  });


  ngOnInit(): void {
    this.phoneForm.patchValue({
      number: "+97431422391",
      internationalNumber: "+974 3142 2391",
      nationalNumber: "3142 2391",
      countryCode: "QA",
      dialCode: "+974"
    });
  }
}
