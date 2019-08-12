import { query, forEach } from '@stereorepo/sac';
import { TweenMax, TimelineMax } from 'gsap';

import { colors } from '../global';

const tadaHandler = () => {
    const [tadaSection] = query({ selector: '#tada' });
    if (!tadaSection) return;

    const syllables = query({ selector: '.js-syllable', ctx: tadaSection });
    const timeline = new TimelineMax({ repeat: -1 });

    const addTween = element => {
        timeline.add(
            TweenMax.to(element, 0.3, {
                color: colors.blue
            })
        );
        timeline.add(
            TweenMax.set(element, {
                color: colors.white
            })
        );
    };

    const animateSyllable = () => {
        forEach(syllables, syllable => {
            addTween(syllable);
        });

        timeline.play();
    };

    animateSyllable();
};

export default tadaHandler;
