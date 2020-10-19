import React from 'react';

import css from './CardLabel.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps, cardLabelColorsMap } from '../../../common/data';
import { CardLabel as CardLabelModel } from '../../../models/card';

interface CardLabelProps extends BaseProps {
    cardlabel: CardLabelModel;
}

const CardLabel = (props: CardLabelProps) => {
    return (
        <div
            style={{ 
                ...props.style, 
                backgroundColor: props.cardlabel.color, 
                color: cardLabelColorsMap[props.cardlabel.color] 
            }}
            className={concatCssClasses(css.cardLabel, props.className)}
        >
            {props.cardlabel.name}
        </div>
    );
}

export default CardLabel;