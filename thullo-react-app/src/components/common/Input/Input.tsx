import React from 'react';
import { concatCssClasses } from '../../../common/functionality';
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
    return (
        <input
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeHolder}
            value={props.value}
            className={concatCssClasses(css.input, props.className, props.isInvalid ? css.invalidInput : "")}
            style={{...props.style}}
        />
    );
}

export default Input;