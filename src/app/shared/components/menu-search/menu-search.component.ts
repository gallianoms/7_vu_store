import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrl: './menu-search.component.scss'
})
export class MenuSearchComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
