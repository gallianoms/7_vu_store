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
import { MenuSearchComponent } from './components/menu-search/menu-search.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CreateProductButtonComponent } from './components/create-product-button/create-product-button.component';

@NgModule({
  declarations: [BtnBackComponent, HeaderComponent, FooterComponent, CardComponent, SearchComponent, TableComponent, LoadingOverlayComponent,
    NotImgFoundPipe, TruncatePipe, MenuSearchComponent, CreateProductButtonComponent
  ],
  imports: [CommonModule],
  exports: [BtnBackComponent, HeaderComponent, FooterComponent, LoadingOverlayComponent, CardComponent, NotImgFoundPipe, SearchComponent, MenuSearchComponent, TableComponent,
    CreateProductButtonComponent
  ],
})
export class SharedModule {}
