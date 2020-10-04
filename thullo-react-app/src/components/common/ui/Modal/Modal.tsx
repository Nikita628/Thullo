import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './Modal.module.css';

interface ModalProps extends BaseProps {
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Modal = (props: ModalProps) => {
    return (
        <div style={{ ...props.style }} className={concatCssClasses(css.modal, props.className)}>
            <span onClick={props.onClose} className={css.closeButton}>&times;</span>
            {props.children}
        </div>
    );
}

export default Modal;