import React from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './Button.module.css';

interface ButtonProps extends BaseProps {
    type: "primary" | "secondary" | "secondary-outline"
        | "light";
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            disabled={props.disabled}
            type="button"
            onClick={props.onClick}
            className={concatCssClasses(css.button, css[props.type], props.className)}
            style={{...props.style}}
        >
            {props.children}
        </button>
    );
}

export default Button;