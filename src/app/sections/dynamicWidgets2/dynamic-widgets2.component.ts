import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import {
  CompactType,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType
} from 'angular-gridster2';
import { MarkdownModule } from 'ngx-markdown';
import { WidgetA2Component } from './widgetA2.component';
import { WidgetB2Component } from './widgetB2.component';
import { WidgetC2Component } from './widgetC2.component';

@Component({
  selector: 'app-compact',
  templateUrl: './dynamic-widgets2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MarkdownModule,
    GridsterComponent,
    GridsterItemComponent
  ]
})
export class DynamicWidgets2Component implements OnInit {
  options: GridsterConfig;
  static dashboard: Array<GridsterItem>;

  get DynamicWidgets2Component() {
    return DynamicWidgets2Component;
  }


  ngOnInit(): void {
    this.options = {
      gridType: GridType.VerticalFixed,
      compactType: CompactType.CompactUp,
      minCols: 0,
      minRows: 0,
      maxCols: 1,
      maxRows: 10000000,
      fixedRowHeight: 1,
      outerMarginRight: undefined,
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      directionLockIgnoreAxes: ['x'],
      displayGrid: 'none',
      disableScrollHorizontal: true,
      disableScrollVertical: true,
    };

    DynamicWidgets2Component.dashboard = [

    ];
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    DynamicWidgets2Component.dashboard.splice(DynamicWidgets2Component.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    DynamicWidgets2Component.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, component:WidgetA2Component, type: 'widgetA'  });
  }

  addWidgetA(): void {
    DynamicWidgets2Component.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, component:WidgetA2Component, type: 'widgetA'  });
  }

  addWidgetB(): void {
    DynamicWidgets2Component.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, component:WidgetB2Component, type: 'widgetB'  });
  }

  addWidgetC(): void {
    DynamicWidgets2Component.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, component:WidgetC2Component, type: 'widgetC'  });
  }


}
