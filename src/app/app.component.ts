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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;
  public title = 'paola-shiadani-pianista';
  public width = 640;
  public height = 360;
  public subscribeArray: Subscription[] = [];
  public profileData: ProfileData | null = null;
  public pianoLessons: PianoClassProfile | null = null;
  public successStories: TestimoniesModule | null = null;
  public promotional: PromotionalModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.getAboutMe();
    this.getPianoLessons();
    this.getSuccessStories();
    this.getPromotional();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tabIndex = params['tab'];
      if (tabIndex !== undefined) {
        this.tabGroup.selectedIndex = +tabIndex;
      }
    });
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }

  ngOnDestroy(): void {
    this.subscribeArray.forEach((element) => {
      element.unsubscribe();
    });
  }

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      const sizeH = window.innerHeight;
      return sizeW <= 742 || sizeH <= 450;
    }
    return false;
  }

  public isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public onTabChange(index: number): void {
    // Actualizar el query parameter cuando cambia el tab
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
    });
  }

  private getAboutMe(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('aboutMe').subscribe({
        next: (aboutMe: ProfileData[]) => {
          this.profileData = aboutMe[0];
        },
      })
    );
  }

  private getPianoLessons(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('pianoLessons').subscribe({
        next: (pianoLessons: PianoClassProfile[]) => {
          this.pianoLessons = pianoLessons[0];
        },
      })
    );
  }
  private getSuccessStories(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('successStories').subscribe({
        next: (pianoLessons: TestimoniesModule[]) => {
          this.successStories = pianoLessons[0];
        },
      })
    );
  }

  private getPromotional(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('promotional').subscribe({
        next: (promotional: PromotionalModel[]) => {
          this.promotional = promotional[0];
        },
      })
    );
  }
}
