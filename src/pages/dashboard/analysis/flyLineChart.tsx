import * as echarts from 'echarts/core';
import { useEffect, useRef, useState } from 'react';

import Echarts, { EchartsOption, EchartsRef } from '@/components/echarts';
import useDashboardStore from '@/store/dashboard';

const geoCoordMap: Record<string, [number, number]> = {
  北京: [116.4551, 40.2539],
  上海: [121.4648, 31.2891],
  广州: [113.5107, 23.2196],
  成都: [104.0665, 30.5728],
};

const flyLineData = [
  { from: '北京', to: '上海', value: 95 },
  { from: '北京', to: '广州', value: 90 },
  { from: '北京', to: '成都', value: 80 },
  { from: '成都', to: '上海', value: 80 },
  { from: '成都', to: '广州', value: 80 },
];

const regionData = [
  { name: '北京', value: 300 },
  { name: '上海', value: 200 },
  { name: '广州', value: 180 },
  { name: '成都', value: 160 },
];

const FlyLineChart = () => {
  const chartRef = useRef<EchartsRef>(null);
  const [option, setOption] = useState<EchartsOption>({});
  const { getChinaGeo } = useDashboardStore();

  const handleLoad = async () => {
    const chinaGeo = await getChinaGeo();
    echarts.registerMap('china', chinaGeo);

    const convertFlyLineData = flyLineData.map((item) => ({
      fromName: item.from,
      toName: item.to,
      coords: [geoCoordMap[item.from], geoCoordMap[item.to]],
      value: item.value,
    }));
    const data: EchartsOption = {
      backgroundColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#001f3f' },
          { offset: 1, color: '#003f5c' },
        ],
      },
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        min: 100,
        max: 300,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        inRange: {
          color: ['#50a3ba', '#eac736', '#d94e5d'],
        },
        calculable: true,
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.2,
        center: [104.0, 37.5],
        label: {
          show: false,
          color: '#fff',
        },
        itemStyle: {
          areaColor: 'transparent',
          borderColor: '#FFF',
        },
        emphasis: {
          itemStyle: {
            areaColor: '#001428',
          },
          label: {
            show: false,
          },
        },
        regions: [
          {
            name: '南海诸岛',
            label: {
              show: false,
            },
          },
        ],
      },
      series: [
        {
          name: '飞线轨迹',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          lineStyle: {
            color: '#a6c84c',
            width: 1,
            opacity: 0.6,
            curveness: 0.2,
          },
          data: convertFlyLineData,
        },
        {
          name: '飞线动态',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 3,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 4,
          },
          lineStyle: {
            color: '#f4e925',
            width: 0,
            curveness: 0.2,
          },
          data: [],
        },
        {
          name: '城市点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#fff',
          },
          symbolSize: (val: number[]) => val[2] / 10,
          itemStyle: {
            color: '#f4e925',
          },
          data: regionData.map((item) => ({
            name: item.name,
            value: [...geoCoordMap[item.name], item.value],
          })),
        },
      ],
    };
    setOption(data);

    let flyIndex = 0;
    let flyTimer: NodeJS.Timeout | null = null;

    if (flyTimer) {
      clearInterval(flyTimer);
    }
    flyTimer = setInterval(() => {
      const line = flyLineData[flyIndex];
      // @ts-expect-error: 有这个值
      data.series![1].data = [
        {
          fromName: line.from,
          toName: line.to,
          coords: [geoCoordMap[line.from], geoCoordMap[line.to]],
          value: line.value,
        },
      ];
      setOption(data);
      flyIndex = (flyIndex + 1) % flyLineData.length;
    }, 6000);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Echarts option={option} ref={chartRef} />
    </div>
  );
};

export default FlyLineChart;
