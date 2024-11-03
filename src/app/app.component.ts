import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Route, Router } from '@angular/router';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMenu = false;

  constructor(
    public loadingService: LoadingService,
    private route: Router,
  ) {
    route.events.subscribe(e => {
      if (e instanceof ActivationEnd && e.snapshot.component) {
        this.showMenu = !!e.snapshot.data['showMenu'];
      }
    })
  }
}
