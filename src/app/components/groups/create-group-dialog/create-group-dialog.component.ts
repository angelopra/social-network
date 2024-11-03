import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { NewPostComponent } from '../../new-post/new-post.component';
import { CreateGroupDto } from 'src/app/models';

interface FormValue {
  name: string;
  description: string | null;
  pictureUrl: string | null;
  usersIds: string[];
  tagsIds: string[];
}

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent {
  groupForm = this.nnfb.group({
    name: ['', Validators.required],
    description: this.nnfb.control<string | null>(null),
    pictureUrl: this.nnfb.control<string | null>(null),
    usersIds: this.nnfb.control<string[]>([]),
    tagsIds: this.nnfb.control<string[]>([]),
  });

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    private nnfb: NonNullableFormBuilder,
    private userService: UserService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      this.dialogRef.close(this.formsToCreateGroupDto(this.groupForm.getRawValue()));
    }
  }

  private formsToCreateGroupDto(formValue: FormValue): CreateGroupDto {
    const { name, description, pictureUrl, usersIds, tagsIds } = { ...formValue };
    return { name, description: description ?? undefined, pictureUrl: pictureUrl ?? undefined, usersIds, tagsIds };
  }
}
