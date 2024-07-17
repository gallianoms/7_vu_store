import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './components/btn-back/btn-back.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [BtnBackComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [BtnBackComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
