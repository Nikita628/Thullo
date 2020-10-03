import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import Icon from '../Icon/Icon';
import css from './IconBadge.module.css';

interface IconBadgeProps extends BaseProps {
    icon: string;
    text: string;
}

const IconBadge = (props: IconBadgeProps) => {
    return (
        <div style={{...props.style}} className={concatCssClasses(css.iconBadge, props.className)}>
            <Icon style={{marginRight: "5px"}} type={props.icon} />
            {props.text}
        </div>
    );
}

export default IconBadge;