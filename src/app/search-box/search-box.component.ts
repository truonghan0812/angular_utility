import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import {
  switchMap,
  map,
  tap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { WikiService, WikiResult } from './wiki.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-search-box',
  template: `
  <div class="container text-center col-sm-8 col-md-6 col-lg-4">
  <div *ngIf="errorMsg" class="alert alert-danger">{{errorMsg}}</div>
  <form class="form-group" [formGroup]="form">
      <input type="text" 
             class="form-control list-group-item" 
             id="srch"
             placeholder='Search something'
             formControlName="srch">
  </form>
  <div class="list-group">
      <div *ngFor="let article of articles$ | async">
        <a *ngIf="article.url"
          [title]='article.desc'
          class="list-group-item"
          target="blank"
          [href]="article.url">
            {{article.title}}
        </a>
         <span *ngIf="!article.url">{{article.title}}</span>
      </div>
    </div> 
  </div>  
  `,
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  form: FormGroup;
  errorMsg = '';
  // Listen for search box value changes
  searchTerms$: Observable<string>;
  articles$: Observable<any>;
  constructor(private wikiService: WikiService) {
    this.form = new FormGroup(
      {
        srch: new FormControl('', [Validators.required])
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit() {
    this.searchTerms$ = this.form.get('srch').valueChanges;

    // Turn Observable of search values into Observable of Wikipedia results
    this.articles$ = this.searchTerms$.pipe(
      tap(() => (this.errorMsg = '')), // clear previous error (if any)
      debounceTime(1000), // wait for typing to stop
      distinctUntilChanged(), // only if different than last time
      switchMap((
        searchTerm // cancel any previous request
      ) =>
        this.wikiService.load(searchTerm).pipe(
          /*
          Catch errors here.
          If catch error from outside, the obserable of input gonna be completed
          then there no new notification if there`s any error happened
          (Network died and become alive)
           */
          catchError(err => {
            this.errorMsg = err;
            return EMPTY;
          })
        )
      ),
      map(this.prettifyResults)
    );
  }
  prettifyResults(list: WikiResult[]): WikiResult[] {
    return list.length === 0 ? [{ title: 'No results' }] : list;
  }
}
