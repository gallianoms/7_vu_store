import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './components/btn-back/btn-back.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { NotImgFoundPipe } from './pipes/not-img-found.pipe';

@NgModule({
  declarations: [BtnBackComponent, HeaderComponent, FooterComponent, CardComponent, SearchComponent, TableComponent, LoadingOverlayComponent,
    NotImgFoundPipe
  ],
  imports: [CommonModule],
  exports: [BtnBackComponent, HeaderComponent, FooterComponent, LoadingOverlayComponent, CardComponent, NotImgFoundPipe, SearchComponent],
})
export class SharedModule {}
