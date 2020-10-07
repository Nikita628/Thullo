import React from 'react';

import css from './BoardListDeletion.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps } from '../../../common/data';
import Button from '../../common/ui/Button/Button';
import Modal from '../../common/ui/Modal/Modal';
import Backdrop from '../../common/ui/Modal/Backdrop/Backdrop';

interface BoardListDeletionProps extends BaseProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const BoardListDeletion = (props: BoardListDeletionProps) => {
    return (
        <div className={concatCssClasses(css.boardListDeletion, props.className)}>
            <Backdrop onClick={props.onCancel} />
            <Modal hasCloseButton={false} onClose={props.onCancel}>
                <h4>Are you sure that you want to delete the board list?</h4>
                <p className={css.warningText}>All related data including cards will be removed.</p>
                <div>
                    <Button onClick={props.onConfirm} type="success">Delete</Button>
                    {" "}
                    <Button onClick={props.onCancel} type="light">Cancel</Button>
                </div>
            </Modal>
        </div>
    );
}

export default BoardListDeletion;