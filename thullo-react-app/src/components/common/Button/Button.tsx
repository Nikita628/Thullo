import React from 'react';
import { concatCssClasses } from '../../../common/functionality';
import css from './Button.module.css';

interface ButtonProps {
    type: "primary" | "secondary" | "secondary-outline"
        | "light";
    disabled?: boolean;
    className?: string;
    style?: any;
    children?: any;
    onClick?: (e: any) => void;
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