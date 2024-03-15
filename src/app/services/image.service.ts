import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private sanitizer: DomSanitizer) { }

  async convertAllImagesToUrl(images: number[][]): Promise<SafeUrl[]> {
    let imageUrls: SafeUrl[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const url = await this.convertImageToUrl(image);
        if (url) {
          imageUrls.push(this.sanitizer.bypassSecurityTrustUrl(url));
        }
      }
    }
    return imageUrls;
  }

  async convertImageToUrl(image: number[]): Promise<string | undefined> {
    try {
      return 'data:image/jpeg;base64,' + image;
    } catch (error) {
      console.error('Error converting image to URL:', error);
      return undefined;
    }
  }
  

  

  convertImageToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('File is null or undefined');
      }

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
