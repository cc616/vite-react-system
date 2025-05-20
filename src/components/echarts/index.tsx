import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { EffectScatterChart, LinesChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import useDashboardStore from '@/store/dashboard';
import { ECBasicOption } from 'echarts/types/dist/shared';

echarts.use([GeoComponent, TooltipComponent, LinesChart, CanvasRenderer, VisualMapComponent, EffectScatterChart]);

export type EchartsOption = ECBasicOption;

interface EchartsProps {
  style?: React.CSSProperties;
  className?: string;
  option: EchartsOption;
  needRegisterMap?: boolean;
}

export type EchartsRef = {
  echarts: echarts.ECharts | null;
};

const Echarts = (props: EchartsProps, ref: React.Ref<EchartsRef>) => {
  const { style, className, option, needRegisterMap } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { getChinaGeo } = useDashboardStore();

  const initChart = async () => {
    if (needRegisterMap) {
      const res = await getChinaGeo();
      echarts.registerMap('china', res);
    }

    if (chartInstance.current) {
      chartInstance.current.setOption(option);
    } else {
      chartInstance.current = echarts.init(chartRef.current!);
      chartInstance.current.setOption(option);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    initChart();
  }, [option]);

  const handleResize = () => {
    chartInstance.current?.resize({
      animation: { duration: 300 },
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      echarts: chartInstance.current,
    }),
    [chartInstance],
  );

  return <div ref={chartRef} className={className} style={{ width: '100%', height: '100%', ...(style ?? {}) }} />;
};

export default forwardRef(Echarts);
