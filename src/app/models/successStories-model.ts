import { SafeResourceUrl } from '@angular/platform-browser';

interface Story {
  titule: string;
  textBody: string;
  urlImg?: string; // Esta propiedad es opcional
  urlVideo?: string; // Esta propiedad es opcional
  urlRes?: SafeResourceUrl;
}

export interface TestimoniesModule {
  id: string;
  moduleName: string;
  stories: Story[];
}
