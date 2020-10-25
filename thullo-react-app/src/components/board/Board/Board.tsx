import React from 'react';

import css from './Board.module.css';
import { Board as BoardModel } from '../../../models/board';
import UserImagesList from '../../user/UserImagesList/UserImagesList';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps } from '../../../common/data';

interface BoardProps extends BaseProps {
    board: BoardModel;
}

const maxNumberOfUsersToDisplay = 3;

const Board = (props: BoardProps) => {
    const users = [props.board.createdBy, ...props.board.users];

    return (
        <div className={concatCssClasses(css.board, props.className)} onClick={props.onClick}>

            <img alt="" className={css.boardImg} src={props.board.coverUrl} />

            <h5 className={css.boardTitle}>{props.board.title}</h5>

            <div className={css.usersList}>
                {
                    props.board.users
                    && <div style={{ display: "inline-block" }}>
                        <UserImagesList amountOfUsersToDisplay={maxNumberOfUsersToDisplay} users={users} />
                    </div>
                }

                {
                    users.length > maxNumberOfUsersToDisplay
                    && <span className="text-muted">+ {users.length - maxNumberOfUsersToDisplay} others</span>
                }
            </div>

        </div>
    );
}

export default Board;