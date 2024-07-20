import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@/environments/environment.development';

@Pipe({
  name: 'notImgFound'
})
export class NotImgFoundPipe implements PipeTransform {

  private imgNotFound = environment.imgNotFound;

  transform(value: string | string[] | undefined): string {
    const fallback = this.imgNotFound;

    if (!value) {
      return fallback;
    }

    // Si value es un array, toma el primer elemento
    if (Array.isArray(value)) {
      value = value.length > 0 ? value[0] : '';
    }

    // Comprueba si la URL es válida
    return this.isValidUrl(value) ? value : fallback;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
}
