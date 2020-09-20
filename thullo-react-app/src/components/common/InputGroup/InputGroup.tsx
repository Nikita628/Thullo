import React, { ReactNode } from 'react';

import css from './InputGroup.module.css';

interface InputGroupProps {
    placeHolder?: string;
    name?: string;
    type?: string;
    className?: string;
    children?: ReactNode;
}

const InputGroup = (props: InputGroupProps) => {
    return (
        <div className={css.inputGroup + props.className ? " " + props.className : ""}>
            <input className={css.input} type={props.type} placeholder={props.placeHolder} name={props.name} />
            {props.children}
        </div>
    );
}

export default InputGroup;