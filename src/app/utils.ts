import { Observable } from 'rxjs';
export default class Utils {
  static createObservableFromLocalStorage<T, O>(dataKey: O) {
    return Observable.create(observer => {
      if (localStorage) {
        const serializedDataToGet = localStorage.getItem(dataKey.toString());
        const dataToGet = JSON.parse(serializedDataToGet);
        observer.next(dataToGet || []);
      }
      observer.complete();
    }) as Observable<T[]>;
  }
}
