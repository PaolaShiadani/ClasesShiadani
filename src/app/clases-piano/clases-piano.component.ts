import { Component, HostListener, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PianoClassProfile } from '../models/pianoLesson-model';
import { ProfileData } from '../models/aboutMe-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clases-piano',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatIconModule],
  templateUrl: './clases-piano.component.html',
  styleUrl: './clases-piano.component.scss',
})
export class ClasesPianoComponent {
  readonly panelOpenState = signal(false);
  @Input() pianoLessons: PianoClassProfile | null = null;
  @Input() profileData: ProfileData | null = null;
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public sizeH = 0;
  public width = 640;
  public height = 360;
  public load = false;
  public mobile = false;
  public resourceUrl: SafeResourceUrl | null = null;

  constructor(public sanitizer: DomSanitizer) {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
      this.load = true;
    }
  }

  ngOnChanges(): void {
    if (this.profileData) {
      this.resourceUrl = this.getSanitizer(
        this.pianoLessons?.urlPresentacion + '?autoplay=1&mute=1&cc_load_policy=0'
      );
    }
  }

  ngOnInit(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }

  public getSanitizer(url: string): SafeResourceUrl {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return sanitizedUrl;
  }

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      const sizeH = window.innerHeight;
      this.sizeH = window.innerHeight;
      return sizeW <= 742 || sizeH <= 450;
    }
    return false;
  }

  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public scrollToPanel(index: string | number): void {
    setTimeout(function () {
      const element = document.getElementById('panelRefCalss' + index);
      const container = document.getElementById('divClasesConteiner') as HTMLElement;

      if (element && container) {
        const elementOffset = element.offsetTop - container.offsetTop;
        container.scrollTo({
          top: elementOffset,
          behavior: 'smooth',
        });
      }
    }, 150);
  }
}
