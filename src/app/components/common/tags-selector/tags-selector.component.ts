import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { isString } from 'lodash-es';
import { TagDto } from 'src/app/models';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-tags-selector[tagsIdsControl]',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.scss']
})
export class TagsSelectorComponent implements OnInit {
  @Input() tagsIdsControl!: FormControl<string[]>;

  availableTags: TagDto[] = [];
  filteredTags: TagDto[] = [];
  selectedTags: TagDto[] = [];
  filter = new FormControl('');

  constructor(private tagsService: TagsService) {
    this.filter.valueChanges.subscribe(v => this.filteredTags = this.availableTags.filter(t => t.name.toLowerCase().includes(isString(v) ? v.toLowerCase() : '')));
  }

  ngOnInit(): void {
    this.tagsService.getAll().subscribe(t => {
      this.availableTags = this.filteredTags = t.sort((a, b) => a.name.localeCompare(b.name));
      this.selectedTags = this.availableTags.filter(t => this.tagsIdsControl.value.includes(t.id));
    });
  }

  remove(tag: TagDto): void {
    this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    this.availableTags.push(tag);
    this.availableTags.sort((a, b) => a.name.localeCompare(b.name));
    this.filter.setValue(this.filter.value);
    this.updateTagsIdsControl();
  }

  add(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.value);
    this.availableTags.splice(this.availableTags.indexOf(event.option.value), 1);
    this.filter.reset();
    event.option.deselect();
    this.updateTagsIdsControl();
  }

  private updateTagsIdsControl(): void {
    this.tagsIdsControl.setValue(this.selectedTags.map(t => t.id));
  }
}
