import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  TransformComponent,
  VisualMapComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { PieChart } from'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { ToolboxComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { HeatmapChart } from 'echarts/charts';
import { GraphChart } from 'echarts/charts';

import { ScatterChart } from 'echarts/charts';



echarts.use([
  GraphChart,
  ScatterChart,
  ToolboxComponent,
  LegendComponent,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
  BarChart,
  LabelLayout,
  UniversalTransition,
  TitleComponent,
  VisualMapComponent,
  HeatmapChart,

]);

export default echarts;
