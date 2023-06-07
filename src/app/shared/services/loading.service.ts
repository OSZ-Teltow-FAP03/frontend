import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false);
  set laoding(bool: boolean) {
    this.loading$.next(bool);
  }

  get loadingAsObservable() {
    return this.loading$.asObservable();
  }
}
