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
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterItemComponentInterface,
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
    GridsterItemComponent,
  ],
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
      minCols: 1,
      minRows: 0,
      maxCols: 1,
      maxRows: 10000000,
      fixedRowHeight: 1,
      outerMarginRight: undefined,
      pushItems: true,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: this.eventStop.bind(this),
        start: this.eventStart.bind(this),
        dropOverItems: false,
        dropOverItemsCallback: this.overlapEvent.bind(this),
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        start: this.eventStart.bind(this),
        stop: this.eventStop.bind(this),
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true,
        },
      },
      directionLockIgnoreAxes: ['x'],
      displayGrid: 'none',
      disableScrollHorizontal: true,
      disableScrollVertical: true,
      initCallback: this.gridInit.bind(this),
      destroyCallback: this.gridDestroy.bind(this),
      gridSizeChangedCallback: this.gridSizeChanged.bind(this),
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
      itemInitCallback: this.itemInit.bind(this),
      itemRemovedCallback: this.itemRemoved.bind(this),
      itemValidateCallback: this.itemValidate.bind(this),
    };

    // this.options.initCallback = this.gridInit.bind(this);

    DynamicWidgets2Component.dashboard = [];
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    DynamicWidgets2Component.dashboard.splice(
      DynamicWidgets2Component.dashboard.indexOf(item),
      1
    );
  }

  addItem(): void {
    // DynamicWidgets2Component.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, component:WidgetA2Component, type: 'widgetA'  });
  }

  addWidgetA(): void {
    let widget = {
      x: 0,
      y: 0,
      cols: 1,
      rows: 10,
      component: WidgetA2Component,
      type: 'widgetA',
    };
    this.createSpaceAtTop(widget.rows);
    DynamicWidgets2Component.dashboard.push(widget);
    // this.options.compactType = CompactType.CompactUp;
    this.changedOptions();
    console.log('grid', this.grid);
  }

  addWidgetB(): void {
    let widget = {
      x: 0,
      y: 0,
      cols: 1,
      rows: 15,
      component: WidgetB2Component,
      type: 'widgetB',
    };
    this.createSpaceAtTop(widget.rows);
    DynamicWidgets2Component.dashboard.push(widget);
    // this.options.compactType = CompactType.CompactUp;
    this.changedOptions();
    console.log('grid', this.grid);
  }

  addWidgetC(): void {
    let widget = {
      x: 0,
      y: 0,
      cols: 1,
      rows: 20,
      component: WidgetC2Component,
      type: 'widgetC',
    };
    this.createSpaceAtTop(widget.rows);
    DynamicWidgets2Component.dashboard.push(widget);
    // this.options.compactType = CompactType.CompactUp;
    this.changedOptions();

    console.log('grid', this.grid);
  }

  createSpaceAtTop(heightInRows: number) {
    this.options.compactType = CompactType.None;
    for (let item of DynamicWidgets2Component.dashboard) {
      item.y += heightInRows;
    }

    this.changedOptions();
  }

  grid: GridsterComponentInterface;

  gridInit(grid: GridsterComponentInterface): void {
    this.grid = grid;
    console.log('gridInit', this.grid);
    console.log(this);
  }

  itemChange(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    console.info('itemChanged', item, itemComponent, this.grid.grid);
    console.info('dashboard', DynamicWidgets2Component.dashboard);
  }

  itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    console.info('itemResized', item, itemComponent);
  }

  itemInit(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    this.options.compactType = CompactType.CompactUp;
    this.changedOptions();
    console.info('itemInitialized', item, itemComponent);
  }

  itemRemoved(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    console.info('itemRemoved', item, itemComponent);
  }

  itemValidate(item: GridsterItem): boolean {
    return item.cols > 0 && item.rows > 0;
  }

  eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStop', item, itemComponent, event, this.grid);
  }

  eventStart(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStart', item, itemComponent, event, this.grid);
  }

  eventStartDrag(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStartDrag', item, itemComponent, event);
  }

  eventStopDrag(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
    console.info('eventStopDrag', item, itemComponent, event);
  }

  overlapEvent(
    source: GridsterItem,
    target: GridsterItem,
    grid: GridsterComponent
  ): void {
    console.log('overlap', source, target, grid);
  }

  gridDestroy(grid: GridsterComponentInterface): void {
    console.info('gridDestroy', grid);
  }

  gridSizeChanged(grid: GridsterComponentInterface): void {
    console.info('gridSizeChanged', grid);
  }
}
