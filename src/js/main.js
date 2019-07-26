import '../scss/main.scss';
import { superLoad } from '@stereorepo/sac';


const preloadHandler = () => {
};

superLoad.initializeLoadingShit({
    preloadCallback: preloadHandler,
    noTransElementsClass: '.element-without-transition-on-resize'
});
