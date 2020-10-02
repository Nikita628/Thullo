import React from 'react';
import { BaseProps } from '../../../../../common/data';
import { concatCssClasses } from '../../../../../common/functionality';

import css from './InputGroupInput.module.css';

interface InputGroupInputProps extends BaseProps {
    placeHolder?: string;
    name?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroupInput = (props: InputGroupInputProps) => {
    return (
        <input
            onChange={props.onChange}
            className={concatCssClasses(css.input, props.className)}
            type={props.type}
            placeholder={props.placeHolder}
            name={props.name}
            style={{...props.style}}
        />
    );
}

export default InputGroupInput;