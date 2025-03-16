import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { GridsterComponent, GridsterItem, GridsterItemComponent } from 'angular-gridster2';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { DynamicWidgets2Component } from './dynamic-widgets2.component';

@Component({
  selector: 'app-widget-b2',
  template: `{{item.type}}       <div class="button-holder">
  <button
    mat-mini-fab
    (mousedown)="removeItem($event, item)"
    (touchstart)="removeItem($event, item)"
  >
    <mat-icon>delete</mat-icon>
  </button>
</div> ` ,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MarkdownModule,
    GridsterComponent,
    GridsterItemComponent
  ],
  standalone: true
})
export class WidgetB2Component implements OnInit, OnDestroy {
  @Input()
  item;


  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    DynamicWidgets2Component.dashboard.splice(DynamicWidgets2Component.dashboard.indexOf(item), 1);
  }
}
