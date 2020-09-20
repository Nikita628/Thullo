import React, { ReactNode } from 'react';

import css from './InputGroupButton.module.css';

interface InputGroupButtonProps {
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputGroupButton = (props: InputGroupButtonProps) => {
    return (
        <button onClick={props.onClick} className={css.button}>
            {props.children}
        </button>
    );
}

export default InputGroupButton;