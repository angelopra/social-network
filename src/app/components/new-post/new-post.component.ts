import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  postForm = this.nnfb.group({
    content: ['', Validators.required],
    tagsIds: this.nnfb.control<string[]>([]),
    isPrivate: true,
  });
  
  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    private nnfb: NonNullableFormBuilder,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.dialogRef.close(this.postForm.getRawValue());
    }
  }
}
