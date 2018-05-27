import { Component, OnInit, forwardRef, Self } from '@angular/core';
import { ControlValueAccessor, Validators, AbstractControl, NgControl, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-address',
    templateUrl:'./address.component.html'
})
export class AddressComponent implements ControlValueAccessor {
    _onChange: (value: any) => void;
    _onTouched: (value: any) => void;
    _isActive: boolean;
    form: FormGroup;

    constructor( @Self() public controlDir: NgControl) {
        this.form = new FormGroup({
            street: new FormControl(''),
            city: new FormControl('')
          },{updateOn:'blur'});

        controlDir.valueAccessor = this;
    }
    get isActive(): boolean {
        return this._isActive;
    }
    set isActive(isActive: boolean) {
        this._isActive = isActive;
    }
    writeValue(obj: any): void {
        /** Model to View handler. When form control or model want to write to the DOM element */
        obj && this.form.setValue(obj,{emitEvent:false});
    }
    registerOnChange(fn:(val:any)=> void){
        //View to Model handler
        this.form.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn:() => void) {
        //If the parent is touched, all the children will be touched
       this._onTouched = fn;
    }
    setDisabledState?(disable: boolean): void {
        disable ? this.form.disable() : !this.form.enable();
    }
    toggle(isActive: boolean) {
        this.isActive = isActive;
        this._onChange(isActive);
    }
}
