import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { createRetryWhenNotifier } from './retry-when-notifier';
import { retryWhen, map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';

export interface WikiResult {
  title: string;
  desc?: string;
  url?: string;
}

const wikiUrl =
  'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  constructor(private http: HttpClient) {}

  load(searchTerm: String): Observable<WikiResult[]> {
    if (searchTerm.length < 2) return of([]);

    const searchUrl = `${wikiUrl}&search=${searchTerm}`;
    const retryNotifier = createRetryWhenNotifier(
      'WikipediaService',
      searchUrl
    );

    return this.http.get(searchUrl).pipe(
      // Progressive retry of a non-404 error
      // Experiment: open dev tools network tab and check "Offline"
      retryWhen(retryNotifier),
      // Catch the error that gets by retryWhen
      catchError(e => {
        console.error(e);
        // "user-friendly error"
        throw new Error('Server error; please contact support');
      }),
      map(result =>
        result[1].reduce(
          (acc: WikiResult[], title, index) =>
            acc.concat({
              title,
              desc: result[2][index],
              url: result[3][index]
            }),
          []
        )
      )
    );
  }
}
