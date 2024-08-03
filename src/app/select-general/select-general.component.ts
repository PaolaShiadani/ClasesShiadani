import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-general',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './select-general.component.html',
  styleUrl: './select-general.component.scss',
})
export class SelectGeneralComponent {
  @Input() formControlGeneral: FormControl = new FormControl();
  @Input() formControlData: FormControl = new FormControl();
  @Input() placeholder = '';
  @Input() label = '';
  @Input() inputSelect = { data: '', name: '' };
  @Input() arrayData: any = [];
  @Input() toll = '';
  @Input() title = '';

  @Output() emitData = new EventEmitter<any>();

  public emitDataClick(option: any) {
    this.emitData.emit(option);
    this.formControlData.setValue(option);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public getNestedProperty(obj: any, path: string): any {
    const pathArray = path.split('.');
    return pathArray.reduce((acc, current) => (acc ? acc[current] : null), obj);
  }
}
