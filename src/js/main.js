import '../scss/main.scss';
import { superLoad } from '@stereorepo/sac';
import stereosupercopter from './Stereosupercopter';

const loadHandler = () => {
    stereosupercopter();
};

superLoad.initializeLoadingShit({
    loadCallback: loadHandler,
    noTransElementsClass: '.element-without-transition-on-resize'
});
