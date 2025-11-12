import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import request from 'superagent';

// 手动生成 __dirname（ESM 环境没有内置）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';
const outputFile = path.resolve(__dirname, '../../public/china.json');

const downloadGeoJSON = async () => {
  try {
    console.log('🌏 开始下载中国地图数据...');
    const res = await request.get(url);
    if (!res.ok) throw new Error(`下载失败: ${res.status} ${res.statusText}`);

    const jsonData = JSON.parse(res.text);
    const formatted = JSON.stringify(jsonData, null, 2);

    fs.writeFileSync(outputFile, formatted, 'utf-8');
    console.log(`✅ 下载完成：${outputFile}`);
  } catch (err) {
    console.error('❌ 下载失败:', err.message);
    process.exit(1);
  }
};

downloadGeoJSON();
