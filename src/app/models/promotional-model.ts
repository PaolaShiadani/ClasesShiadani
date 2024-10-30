import { SafeResourceUrl } from '@angular/platform-browser';

export interface VideoModel {
  description: string;
  url: string;
  titule: string;
  type: string;
  urlRes?: SafeResourceUrl;
}

export interface PromotionalModel {
  id: string;
  filter: string[];
  moduleName: string;
  arrayVideos: VideoModel[];
}
