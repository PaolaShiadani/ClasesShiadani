import { Component, HostListener, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PianoClassProfile } from '../models/pianoLesson-model';
import { ProfileData } from '../models/aboutMe-model';
import { EventProfile } from '../models/event-model';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, CommonModule, GoogleMapsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  readonly panelOpenState = signal(false);
  @Input() eventProfile: EventProfile | null = null;
  @HostListener('window:resize', ['$event'])
  @Input()
  profileData: ProfileData | null = null;
  public sizeW = 0;

  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;

  constructor(private sanitizer: DomSanitizer) {
    console.log(this.eventProfile?.urlMap);
  }

  ngOnInit(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
    console.log(this.eventProfile?.urlMap);
    if (this.eventProfile?.urlMap) {
      console.log('Entra');
      const map = this.eventProfile.urlMap as string;
      this.eventProfile.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(map);
    }
    this.eventProfile?.syllabus.forEach((syllabu) => {
      if (syllabu.urlMap) {
        const mapAux = syllabu.urlMap as string;
        syllabu.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(mapAux);
      }
    });
  }

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      const sizeH = window.innerHeight;
      this.sizeW = window.innerWidth;
      return sizeW <= 742 || sizeH <= 450;
    }
    return false;
  }

  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
