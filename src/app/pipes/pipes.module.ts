import {NgModule} from '@angular/core';
import {ImageGalleryPipe} from './image-gallery.pipe';
import {ImageUrlToBase64Pipe} from './image-url-to-base64.pipe';

@NgModule({
	declarations: [ImageUrlToBase64Pipe, ImageGalleryPipe],
	exports: [ImageUrlToBase64Pipe, ImageGalleryPipe],
})
export class PipesModule {}
