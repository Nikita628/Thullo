import React from 'react';
import css from './Input.module.css';

interface InputProps {
    placeHolder?: string;
    value?: string;
    className?: string;
    style?: any;
    onChange?: (e: any) => void;
}

const Input = (props: InputProps) => {
    let classToAppend = "";

    if (props.className) {
        classToAppend += " " + props.className;
    }

    return (
        <input
            onChange={props.onChange}
            type="text"
            placeholder={props.placeHolder}
            value={props.value}
            className={css.input + classToAppend}
            style={{...props.style}}
        />
    );
}

export default Input;