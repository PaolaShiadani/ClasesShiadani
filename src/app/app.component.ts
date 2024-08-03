import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { ClasesPianoComponent } from './clases-piano/clases-piano.component';
import { MatIconModule } from '@angular/material/icon';
import { TestimoniosComponent } from './testimonios/testimonios.component';
import { PromocionalesComponent } from './promocionales/promocionales.component';

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
export class AppComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;
  title = 'paola-shiadani-pianista';
  public width = 640;
  public height = 360;

  constructor(private route: ActivatedRoute, private router: Router) {}

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
      queryParamsHandling: 'merge',
    });
  }
}
