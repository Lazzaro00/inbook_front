import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private sanitizer: DomSanitizer) { }
  base64Image: string= '';
  
  convertAllImagesToUrl(images: number[][]): string[] {
    let imageUrls : string[] = [];
    if (images && images.length > 0) {
      images.forEach(image => {
        imageUrls.push(this.convertImageToUrl(image));
      });
    }
    return imageUrls;
  }

  convertImageToUrl(image: number[]): string {
    if (image && image.length > 0) {
      const blob = new Blob([new Uint8Array(image)], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    }
    return '';
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

  convertBinaryToBase64(binaryData: any) {
    const reader = new FileReader();
    reader.readAsDataURL(binaryData);
    reader.onloadend = () => {
      this.base64Image = reader.result as string;
    };
  }
}
