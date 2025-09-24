import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [MatCardModule, MatTabsModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss',
})
export class TermsAndConditionsComponent {
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;
  public height = 360;
  public sizeH = 430;

  public pdfSafeUrl!: SafeResourceUrl;
  public pdfSafeUrl2!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const fileId = '1ii6AEGkCdFjajjYVBO3NTt5260H67VET';
    const pdfUrl = encodeURIComponent(`https://drive.google.com/uc?export=download&id=${fileId}`);
    const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`;
    this.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(viewerUrl);

    const fileId2 = '1ii6AEGkCdFjajjYVBO3NTt5260H67VET';
    const pdfUrl2 = encodeURIComponent(`https://drive.google.com/uc?export=download&id=${fileId}`);
    const viewerUrl2 = `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`;
    this.pdfSafeUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(viewerUrl);
  }

  ngOnInit(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
      this.sizeH = window.innerHeight;
    }
  }

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      this.sizeH = window.innerHeight;
      return sizeW <= 742 || this.sizeH <= 450;
    }
    return false;
  }

  public isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
