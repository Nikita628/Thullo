import React from 'react';

import css from './Board.module.css';
import { Board as BoardModel } from '../../../models/board';
import UserImagesList from '../../user/UserImagesList/UserImagesList';
import { concatCssClasses } from '../../../common/functionality';

interface BoardProps {
    board: BoardModel;
    key?: number;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const maxNumberOfUsersToDisplay = 3;

const Board = (props: BoardProps) => {
    return (
        <div className={concatCssClasses(css.board, props.className)} onClick={props.onClick}>

            <img className={css.boardImg} src={props.board.coverUrl} />

            <h5 className={css.boardTitle}>{props.board.title}</h5>

            <div className={css.usersList}>
                {
                    props.board.users
                        ? <div style={{ display: "inline-block" }}><UserImagesList amountOfUsersToDisplay={maxNumberOfUsersToDisplay} users={props.board.users} /></div>
                        : null
                }

                {
                    props.board.users.length > maxNumberOfUsersToDisplay
                        ? <span className="text-muted">+ {props.board.users.length - maxNumberOfUsersToDisplay} others</span>
                        : null
                }
            </div>

        </div>
    );
}

export default Board;