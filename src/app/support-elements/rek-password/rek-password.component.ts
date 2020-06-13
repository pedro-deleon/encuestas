import { Component, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'rek-password',
  templateUrl: './rek-password.component.html',
  styleUrls: ['./rek-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RekPasswordComponent),
      multi: true
    }
  ]
})
export class RekPasswordComponent implements OnInit, ControlValueAccessor {

  value: string;

  onChange = (_:any) => {}

  onTouch = () => {}

  faEye = faEye;
  isPasswordHide: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onInput(value: string){
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }



  writeValue(value: any) {
    if(value){
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {

  }


  toggleEye(htmlInputElement: HTMLInputElement){
    if(this.isPasswordHide){
      this.faEye = faEyeSlash;
      this.isPasswordHide = false;
      htmlInputElement.type = "text"
    } else {
      this.faEye = faEye
      this.isPasswordHide = true;
      htmlInputElement.type = "password"
    }
  }

}
