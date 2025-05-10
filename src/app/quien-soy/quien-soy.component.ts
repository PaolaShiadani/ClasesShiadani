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
  public load = true;
  public mobile = false;
  public width = 640;
  public height = 360;
  public sizeH = 0;

  @Input() profileData: ProfileData | null = null;

  ngOnInit(): void {}

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
