import { environment } from '@/environments/environment.development';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notImgFound'
})
export class NotImgFoundPipe implements PipeTransform {

  private imgNotFound = environment.imgNotFound;  

  transform(value: string | undefined): string {
    const fallback = this.imgNotFound; 
    return value ? value : fallback;
  }

}

