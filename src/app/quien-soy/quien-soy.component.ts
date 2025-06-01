import { Component, HostListener, Input, signal } from '@angular/core';
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
  @Input() profileData: ProfileData | null = null;
  public load = true;
  public mobile = false;
  public width = 640;
  public height = 360;
  public sizeH = 0;

  // Pruebas fotos
  private imageId = '1HQuxXjymU8KIuNYMqSikE9kohFXa6a7d';
  public resourceUrl: SafeResourceUrl | null = null;
  //

  ngOnInit(): void {}

  // Pruebas fotos
  constructor(public sanitizer: DomSanitizer) {
    const url = `https://drive.usercontent.google.com/download?id=${this.imageId}&export=view&authuser=0`;
    this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(this.resourceUrl);
  }

  //

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      this.sizeH = window.innerHeight;
      return sizeW <= 742 || this.sizeH <= 450;
    }
    return false;
  }

  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
