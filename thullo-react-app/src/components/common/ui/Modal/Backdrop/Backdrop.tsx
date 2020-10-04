import React from 'react';

import { BaseProps } from '../../../../../common/data';
import { concatCssClasses } from '../../../../../common/functionality';
import css from './Backdrop.module.css';

interface BackdropProps extends BaseProps {

}

const Backdrop = (props: BackdropProps) => {
    return (
        <div
            style={{ ...props.style }}
            className={concatCssClasses(css.backdrop, props.className)}
            onClick={props.onClick}
        >
        </div>
    );
}

export default Backdrop;