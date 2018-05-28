
/*
Render2: Make direct DOM access safe (setAttribute, removeAttribute, addClass..)
*/
import { Directive, ElementRef, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Renderer2 } from "@angular/core";

@Directive({
    selector: '[addAttribute]'
})
export class AddAttributeDirective implements OnInit {
    @Input() addAttribute;

    constructor (private element: ElementRef, private render: Renderer2){}

    ngOnInit(){
        this.render.setAttribute(this.element.nativeElement, this.addAttribute, '');
    }
}