import React, { ReactNode } from 'react';
import { BaseProps } from '../../../../../common/data';
import { concatCssClasses } from '../../../../../common/functionality';

import css from './InputGroupButton.module.css';

interface InputGroupButtonProps extends BaseProps {
    children?: ReactNode;
}

const InputGroupButton = (props: InputGroupButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={concatCssClasses(css.button, props.className)}
            style={{ ...props.style }}
        >
            {props.children}
        </button>
    );
}

export default InputGroupButton;