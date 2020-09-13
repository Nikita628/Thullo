import React from 'react';
import css from './Button.module.css';

interface ButtonProps {
    type: "primary" | "secondary" | "secondary-outline"
        | "light";
    className?: string;
    style?: any;
    children?: any;
    onClick?: (e: any) => void;
}

const Button = (props: ButtonProps) => {
    let classToAppend = "";

    if (props.className) {
        classToAppend += " " + props.className;
    }

    return (
        <button
            onClick={props.onClick}
            className={css.button + " " + css[props.type] + classToAppend}
            style={{...props.style}}
        >
            {props.children}
        </button>
    );
}

export default Button;