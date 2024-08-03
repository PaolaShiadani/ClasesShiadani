import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SelectGeneralComponent } from '../select-general/select-general.component';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  public videosArray = [
    {
      url: 'https://www.youtube.com/embed/fS37ajyTtzI',
      type: 'Game',
      titule: 'Shadow of The Colossus Orchestra',
    },
    {
      url: 'https://www.youtube.com/embed/UDlyPDsNv5Q',
      type: 'Game',
      titule: 'Castle In The Mist -ICO',
    },
    {
      url: 'https://www.youtube.com/embed/63OT3_Lfy50',
      type: 'Anime',
      titule: 'Howls Moving Castle',
    },
    {
      url: 'https://www.youtube.com/embed/1KzF1KgaREo',
      type: 'Clasico',
      titule: 'Tchaikovsky: Ouverture 1812',
    },
    {
      url: 'https://www.youtube.com/embed/jXrYzePVgAE',
      type: 'Anime',
      titule: 'Zoltraak - Frieren',
    },
    {
      url: 'https://www.youtube.com/embed/T-ETAEbrVIo',
      type: 'Soundtracks',
      titule: 'El Señor de Los Anillos - LOTR - Ride of the Rohirrim',
    },
    {
      url: 'https://www.youtube.com/embed/PCp2iXA1uLE',
      type: 'Pop',
      titule: 'Frederic Oddloop',
    },
  ];
  public filter = ['All', 'Clasico', 'Soundtracks', 'Pop', 'Anime', 'Game'];
  public videsoArray: { url: SafeResourceUrl; type: string; titule: string }[] =
    [];
  public videsoArrayFilter: {
    url: SafeResourceUrl;
    type: string;
    titule: string;
  }[] = [];

  constructor(public sanitizer: DomSanitizer) {
    this.videosArray.forEach((elemment) => {
      const x = sanitizer.bypassSecurityTrustResourceUrl(elemment.url);
      this.videsoArray.push({
        url: x,
        type: elemment.type,
        titule: elemment.titule,
      });
    });

    this.videsoArrayFilter = this.videsoArray;
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
      this.videsoArrayFilter = this.videsoArray;
    } else {
      this.videsoArrayFilter = this.videsoArray.filter(
        (video) => video.type === filter
      );
    }
  }
}
