import { Injectable } from '@angular/core';
import { Loader } from 'src/app/utils/loader';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loader = new Loader();

  get isLoading(): boolean {
    return this.loader.isLoading;
  }

  set isLoading(val: boolean) {
   this.loader.isLoading = val;
  }
}
