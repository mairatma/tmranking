'use client';

import { Chart, ChartRootProps, useChart } from '@chakra-ui/charts';
import { format } from 'date-fns';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface DateChartEntry {
  value: number;
  date: Date;
}

interface Props extends Omit<
  ChartRootProps<DateChartEntry>,
  'chart' | 'children'
> {
  data: DateChartEntry[];
}

export const DateLineChart = ({ data, ...otherProps }: Props) => {
  const chart = useChart({
    data,
    series: [{ name: 'value', color: 'primary.900' }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart} {...otherProps}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key('date')}
          tickFormatter={(date: Date) => format(date, 'MMM yyyy')}
          stroke={chart.color('border')}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color('border')}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
};
