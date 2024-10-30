import { Component, HostListener, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProfileData } from '../models/aboutMe-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss',
})
export class QuienSoyComponent {
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public load = false;
  public mobile = false;
  public width = 640;
  public height = 360;
  public resourceUrl: SafeResourceUrl | null = null;
  @Input() profileData: ProfileData | null = null;

  constructor(public sanitizer: DomSanitizer) {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
      this.load = true;
    }
  }

  ngOnChanges(): void {
    if (this.profileData) {
      console.log(this.profileData);
      this.resourceUrl = this.getSanitizer(this.profileData.urlPresentacion);
    }
  }

  ngOnInit(): void {}

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      const sizeH = window.innerHeight;
      return sizeW <= 742 || sizeH <= 450;
    }
    return false;
  }

  public getSanitizer(url: string): SafeResourceUrl {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return sanitizedUrl;
  }

  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
