import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text[inputControl]',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  @Input() inputControl!: FormControl;
  @Input() floatingLabel?: string;
  @Input() placeholder = '';
  @Input() search = false;

  clear(): void {
    this.inputControl.reset();
  }
}
