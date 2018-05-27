import { Component, OnInit, forwardRef, Self } from '@angular/core';
import { ControlValueAccessor, Validators, AbstractControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-switch',
    templateUrl:'./switch.component.html' 
})
export class SwitchComponent implements ControlValueAccessor, OnInit {
    _onChange: (value: any) => void;
    _onTouched: (value: any) => void;
    _isActive: boolean;

    ngOnInit() {
        const control = this.controlDir.control;

        let validators = control.validator ?
            [control.validator, Validators.required]
            : Validators.required;

        control.setValidators(validators);
        control.updateValueAndValidity();
    }

    constructor( @Self() public controlDir: NgControl) {
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
        this.isActive = !!obj; //!! Coerces object to boolean 
    }
    registerOnChange(fn: any): void {
        //View to Model handler
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
       this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        console.warn("Method not implemented.");
    }
    toggle(isActive: boolean) {
        this.isActive = isActive;
        this._onChange(isActive);
    }
    validate(ctrl: AbstractControl) {
        return Validators.required(ctrl);
    }
}
