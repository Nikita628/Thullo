import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './DropdownButton.module.css';

interface DropdownButtonProps extends BaseProps {
    type: "secondary" | "primary";
}

const DropdownButton = (props: DropdownButtonProps) => {
    return (
        <button
            type="button"
            className={concatCssClasses(css.button, props.className, css[props.type])}
            style={{...props.style}}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default DropdownButton;