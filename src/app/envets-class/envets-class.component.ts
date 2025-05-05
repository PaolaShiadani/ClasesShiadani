import { Component, HostListener, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PianoClassProfile } from '../models/pianoLesson-model';

@Component({
  selector: 'app-envets-class',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule],
  templateUrl: './envets-class.component.html',
  styleUrl: './envets-class.component.scss',
})
export class EnvetsClassComponent {
  readonly panelOpenState = signal(false);
  @Input() pianoLessons: PianoClassProfile | null = null;
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    if (this.isPlatformBrowser()) {
      this.mobile = this.isMobile();
    }
  }
  public mobile = false;

  constructor() {}

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
}
