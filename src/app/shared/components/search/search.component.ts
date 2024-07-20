import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
  export class SearchComponent {
    @Output() searchEvent = new EventEmitter<string>();

    onSearch(event: any): void {
      this.searchEvent.emit(event.target.value);
    }
}
