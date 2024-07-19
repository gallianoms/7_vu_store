import { Component, inject } from '@angular/core';
import { LoadService } from './shared/services/loading-overlay/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loadService = inject(LoadService);
  title = '7_vu_store';
}
