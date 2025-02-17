import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './Button.module.css';

interface ButtonProps extends BaseProps {
    type: "primary" | "secondary" | "secondary-outline"
        | "light" | "success" | "danger-outline" | "primary-light" | "link" | "danger";
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            disabled={props.disabled}
            type="button"
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            className={concatCssClasses(css.button, css[props.type], props.className, props.disabled ? css.disabled : "")}
            style={{...props.style}}
        >
            {props.children}
        </button>
    );
}

export default Button;