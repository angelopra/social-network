import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  postForm: FormGroup;
  availableTags: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    private fb: FormBuilder,
    private tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      tags: [[]],
      privacy: ['public']
    });

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
