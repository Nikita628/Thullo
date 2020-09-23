import React from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './Modal.module.css';

interface ModalProps extends BaseProps {
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    isDisplayed: boolean;
}

const Modal = (props: ModalProps) => {
    const onModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <div onClick={props.onClose} className={concatCssClasses(css.modal, props.isDisplayed ? css.modalOpened : css.modalClosed)}>
            <div onClick={onModalContentClick} className={css.modalContent}>
                <span onClick={props.onClose} className={css.closeButton}>&times;</span>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;