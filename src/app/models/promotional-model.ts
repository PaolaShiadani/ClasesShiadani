import { SafeResourceUrl } from '@angular/platform-browser';

interface Video {
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
  arrayVideos: Video[];
}
