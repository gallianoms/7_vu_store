import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './components/btn-back/btn-back.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [BtnBackComponent, HeaderComponent, FooterComponent, CardComponent, SearchComponent],
  imports: [CommonModule],
  exports: [BtnBackComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
