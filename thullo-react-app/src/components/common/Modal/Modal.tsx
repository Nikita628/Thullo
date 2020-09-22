import React from 'react';

import { BaseProps } from '../../../common/data';
import css from './Modal.module.css';

interface ModalProps extends BaseProps {
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    isDisplayed: boolean;
}

const Modal = (props: ModalProps) => {
    return (
        <div onClick={props.onClose} className={css.modal + (props.isDisplayed ? " " + css.modalOpened : " " + css.modalClosed)}>
            <div className={css.modalContent}>
                <span onClick={props.onClose} className={css.closeButton}>&times;</span>
                {props.children ? props.children : null}
            </div>
        </div>
    );
}

export default Modal;