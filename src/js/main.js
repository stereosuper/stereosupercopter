import '../scss/main.scss';
import { superLoad } from '@stereorepo/sac';

import tada from './components/tada';

const preloadHandler = () => {
    tada();
};

superLoad.initializeLoadingShit({
    preloadCallback: preloadHandler,
    noTransElementsClass: '.element-without-transition-on-resize'
});
