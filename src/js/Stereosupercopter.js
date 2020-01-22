import Sprite from './Sprite';

const stereosupercopter = () => {
    const copter = document.getElementById('copter');

    if (!copter) return;

    const columns = 2;
    const rows = 8;

    const spUrl = copter.getAttribute('data-src');
    const spImage = new Image();
    spImage.addEventListener(
        'load',
        () => {
            const spriteAnimation = new Sprite({
                image: copter,
                columns,
                rows,
                interval: 0.05,
                loop: true,
                numberEmpty: 0
            });

            spriteAnimation.play();
        },
        false
    );
    spImage.src = spUrl;
};

export default stereosupercopter;
