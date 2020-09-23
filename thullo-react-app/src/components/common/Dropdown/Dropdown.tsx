import React from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './Dropdown.module.css';

interface DropdownProps extends BaseProps {
}

const Dropdown = (props: DropdownProps) => {
    return (
        <div
            className={concatCssClasses(css.dropdown, props.className)}
        >
            {props.children}
        </div>
    );
}

export default Dropdown;