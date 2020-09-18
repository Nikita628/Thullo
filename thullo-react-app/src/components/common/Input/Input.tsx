import React from 'react';
import css from './Input.module.css';

interface InputProps {
    type: "text" | "password" | "email";
    placeHolder?: string;
    value?: string;
    className?: string;
    style?: any;
    isInvalid?: boolean;
    onChange?: (e: any) => void;
}

const Input = (props: InputProps) => {
    let classToAppend = "";

    if (props.className) {
        classToAppend += " " + props.className;
    }

    if (props.isInvalid) {
        classToAppend += " " + css.invalidInput;
    }

    return (
        <input
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeHolder}
            value={props.value}
            className={css.input + classToAppend}
            style={{...props.style}}
        />
    );
}

export default Input;