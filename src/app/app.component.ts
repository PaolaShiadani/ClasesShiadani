import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { ClasesPianoComponent } from './clases-piano/clases-piano.component';
import { MatIconModule } from '@angular/material/icon';
import { TestimoniosComponent } from './testimonios/testimonios.component';
import { PromocionalesComponent } from './promocionales/promocionales.component';
import { FirestoreService } from './service/firestore.service';
import { Subscription } from 'rxjs';
import { ProfileData } from './models/aboutMe-model';
import { PianoClassProfile } from './models/pianoLesson-model';
import { TestimoniesModule } from './models/successStories-model';
import { PromotionalModel } from './models/promotional-model';
import { GenerateInterfaceComponent } from './generate-interface/generate-interface.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabsModule,
    QuienSoyComponent,
    MatIconModule,
    ClasesPianoComponent,
    TestimoniosComponent,
    PromocionalesComponent,
    GenerateInterfaceComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public mobile = false;
  public title = 'Clases de Piano con Paola Shiadani';
  public width = 640;
  public height = 360;
  public subscribeArray: Subscription[] = [];
  public profileData: ProfileData | null = null;
  public pianoLessons: PianoClassProfile | null = null;
  public successStories: TestimoniesModule | null = null;
  public promotional: PromotionalModel | null = null;

  constructor(
    private meta: Meta,
    private titleMeta: Title
  ) {

    this.titleMeta.setTitle('Clases de Piano con Paola Shiadani');

    this.meta.addTags([
      {
        name: 'description',
        content: '¿Quieres aprender a tocar tus melodías favoritas? Aprende piano con Paola Shiadani, pianista profesional. Clases personalizadas para todas las edades y niveles.'
      },
      {
        name: 'keywords',
        content: 'piano, clases de piano, aprender piano, Paola Shiadani, profesora de piano, educación musical, teclado, piano digital, músico, todos los niveles'
      },
      { name: 'author', content: 'Paola Shiadani y Alfonso Altamirano Leal' },
      { property: 'og:title', content: 'Clases de Piano con Paola Shiadani' },
      {
        property: 'og:description',
        content: '¿Quieres aprender a tocar tus melodías favoritas? Clases de piano para todas las edades y niveles con Paola Shiadani.'
      },
      {
        property: 'og:image',
        content: 'https://firebasestorage.googleapis.com/v0/b/paola-shiadani-pianista-bf1ce.appspot.com/o/imgProfile%2F274725386_1871976246330924_9116791744172320079_n.jpg?alt=media&token=7b046632-047b-4c21-bd78-7e7e56b739a0'
      },
      { property: 'og:url', content: 'https://paola-shiadani-pianista-bf1ce.web.app/' },
      { name: 'language', content: 'es' }
    ]);

  }

}
