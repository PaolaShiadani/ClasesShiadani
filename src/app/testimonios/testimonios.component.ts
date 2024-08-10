import { Component, HostListener, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TestimoniesModule } from '../models/successStories-model';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.scss'],
})
export class TestimoniosComponent {
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;
  public width = 640;
  public height = 360;
  public indexPage = 0;
  @Input() successStories: TestimoniesModule | null = null;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.successStories) {
      this.successStories.stories.forEach((element, index) => {
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          element.urlVideo ?? ''
        );
        this.successStories!.stories[index].urlRes = sanitizedUrl;
      });
    }
  }

  ngOnInit(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }

  public isMobile(): boolean {
    if (this.isPlatformBrowser()) {
      const sizeW = window.innerWidth;
      const sizeH = window.innerHeight;
      return sizeW <= 742 || sizeH <= 450;
    }
    return false;
  }

  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public isIndexVisible(
    index: number,
    currentPage: number,
    itemsPerPage: number
  ): boolean {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    return index >= startIndex && index <= endIndex;
  }

  public scrollToTopAndNewIndex(page: number): void {
    this.indexPage = page;
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Opcional: hace que el desplazamiento sea suave
    });
  }
}
