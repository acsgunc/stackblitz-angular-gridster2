import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { GridsterComponent, GridsterItem, GridsterItemComponent } from 'angular-gridster2';
import { Subscription } from 'rxjs';
import { DynamicWidgets2Component } from './dynamic-widgets2.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-widget-a2',
  template: `{{item.type}}       <div class="button-holder">
  <button
    mat-mini-fab
    (mousedown)="removeItem($event, item)"
    (touchstart)="removeItem($event, item)"
  >
    <mat-icon>delete</mat-icon>
  </button>
  <div class="resize-test"> 200px height </div>
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
export class WidgetA2Component implements OnInit, OnDestroy {
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
