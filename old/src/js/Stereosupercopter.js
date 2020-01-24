import { gsap } from 'gsap';
import Sprite from './Sprite';

const stereosupercopter = () => {
    const copter = document.getElementById('copter');
    const chopper = document.getElementById('chopper');

    if (!copter || !chopper) return;

    const spUrl = copter.getAttribute('data-src');
    const spImg = new Image();

    let sp = null;
    let tl = null;

    spImg.addEventListener(
        'load',
        () => {
            sp = new Sprite({
                image: copter,
                cols: 2,
                rows: 8,
                interval: 0.05,
                loop: true
            });

            tl = gsap.timeline({ repeat: -1 });

            tl.to(chopper, 2, { y: 10 });
            tl.to(chopper, 1.5, { y: 0 });

            sp.play();
        },
        false
    );

    spImg.src = spUrl;
};

export default stereosupercopter;
