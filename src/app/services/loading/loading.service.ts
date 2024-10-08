import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(val: boolean) {
    // TODO: use counter
    this._isLoading = val;
  }
}
