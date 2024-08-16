import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagDto } from 'src/app/models';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  postForm = this.fb.group({
    content: ['', Validators.required],
    tagsIds: [[]],
    isPrivate: true
  });
  availableTags: TagDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    private fb: FormBuilder,
    private tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tagsService.getAll().subscribe(t => this.availableTags = t);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.dialogRef.close(this.postForm.value);
    }
  }
}
