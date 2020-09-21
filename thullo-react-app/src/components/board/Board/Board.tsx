import React from 'react';

import css from './Board.module.css';
import { Board as BoardModel } from '../../../models/board';
import UserImagesList from '../../user/UserImagesList/UserImagesList';

interface BoardProps {
    board: BoardModel;
    key?: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const maxNumberOfUsersToDisplay = 3;

const Board = (props: BoardProps) => {
    return (
        <div className={css.board} onClick={props.onClick}>
            <img className={css.boardImg} src={props.board.coverUrl} />
            <h5 className={css.boardTitle}>{props.board.title}</h5>
            <UserImagesList amountOfUsersToDisplay={maxNumberOfUsersToDisplay} users={props.board.users} />
            {
                props.board.users.length > maxNumberOfUsersToDisplay
                    ? <span className="text-muted">+ {props.board.users.length - maxNumberOfUsersToDisplay} others</span>
                    : null
            }
        </div>
    );
}

export default Board;