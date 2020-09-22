import React from 'react';
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';

import css from './InputGroup.module.css';

interface InputGroupProps extends BaseProps {
}

const InputGroup = (props: InputGroupProps) => {
    return (
        <div className={concatCssClasses(css.inputGroup, props.className)}>
            {props.children}
        </div>
    );
}

export default InputGroup;