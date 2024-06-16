import { Component, Input } from '@angular/core';
import { ContentListOptions } from 'src/app/interfaces/content-list-options';

@Component({
  selector: 'app-content-list[items]',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent<T> {
  @Input() items: T[] | null = null;
  @Input() options?: ContentListOptions<T>;
}
