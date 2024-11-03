import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;

  get isLoading(): boolean {
    return this.loadingCount > 0;
  }

  set isLoading(val: boolean) {
   this.loadingCount += val ? 1 : -1;
   if (this.loadingCount < 0) this.loadingCount = 0;
  }
}
