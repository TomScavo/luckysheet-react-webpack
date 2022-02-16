import React from 'react';
import $ from 'jquery';
import 'spectrum-colorpicker';
import * as ReactDOM from 'react-dom';
import Luckysheet from './luckysheet';
import './jquery-mousewheel';

import '@/luckysheet/src/css/luckysheet-core.css';
import '@/luckysheet/src/css/luckysheet-cellFormat.css';
import '@/luckysheet/src/css/luckysheet-print.css';
import '@/luckysheet/src/css/luckysheet-zoom.css';
import '@/luckysheet/src/css/iconCustom.css';
import '@/luckysheet/src/assets/iconfont/iconfont.css';
import 'spectrum-colorpicker/spectrum.css';

ReactDOM.render(
  <div>
    <Luckysheet />
  </div>,
  document.getElementById('root')
);
