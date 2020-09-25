import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './DropdownContent.module.css';

interface DropdownContentProps extends BaseProps {
    isDisplayed: boolean;
    offsetY?: number;
    offsetX?: number;
}

const DropdownContent = (props: DropdownContentProps) => {
    return (
        props.isDisplayed
            ? <div
                className={concatCssClasses(css.dropdownContent, props.className)}
                style={{
                    ...props.style,
                    marginTop: props.offsetY ? `${props.offsetY}px` : undefined,
                    marginLeft: props.offsetX ? `${props.offsetX}px` : undefined,
                }}
            >
                {props.children}
            </div>
            : null
    );
}

export default DropdownContent;