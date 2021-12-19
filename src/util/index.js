import Vue from 'vue';

import * as time from './time.js';
import * as common from './common.js';

Vue.prototype.$util = Object.assign(time,common);
