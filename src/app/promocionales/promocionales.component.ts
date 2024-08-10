import { Component, HostListener, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SelectGeneralComponent } from '../select-general/select-general.component';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PromotionalModel } from '../models/promotional-model';

@Component({
  selector: 'app-promocionales',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, SelectGeneralComponent],
  templateUrl: './promocionales.component.html',
  styleUrl: './promocionales.component.scss',
})
export class PromocionalesComponent {
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public formFilters = new FormControl();
  public subscribeArray: Subscription[] = [];
  public mobile = false;
  public width = 640;
  public height = 360;
  public indexPage = 0;
  @Input() promotional: PromotionalModel | null = null;
  public filter = ['All', 'Clasico', 'Soundtracks', 'Pop', 'Anime', 'Game'];

  public videsoArrayFilter: PromotionalModel | null = null;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.promotional) {
      this.promotional.arrayVideos.forEach((element, index) => {
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          element.url ?? ''
        );
        this.promotional!.arrayVideos[index].urlRes = sanitizedUrl;
      });
      this.filter = this.promotional.filter;
      this.videsoArrayFilter = this.promotional;
    }
  }

  ngOnInit(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
    this.onChangeSelectFilter();
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
      behavior: 'smooth',
    });
  }

  public onChangeSelectFilter(): void {
    this.subscribeArray[0] = this.formFilters.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(700))
      .subscribe((filter) => {
        this.indexPage = 0;
        this.filterVideos(filter);
      });
  }

  private filterVideos(filter: string): void {
    if (filter === 'All') {
      this.videsoArrayFilter = this.promotional;
    } else {
      const x = this.promotional?.arrayVideos.filter(
        (video) => video.type === filter
      );

      this.videsoArrayFilter!.arrayVideos = x ?? [];
    }
  }
}
