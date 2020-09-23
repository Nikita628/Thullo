import React from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './Input.module.css';

interface InputProps extends BaseProps {
    type: "text" | "password" | "email";
    placeHolder?: string;
    value?: string;
    isInvalid?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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