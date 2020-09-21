import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { AppState } from '../../../state';
import Button from '../../common/Button/Button';
import css from './AllBoards.module.css';
import { actionCreators } from "../../../state/board";
import { BoardSearchParam } from '../../../models/board';
import Board from '../Board/Board';

interface AllBoardsProps {

}

const AllBoards = (props: AllBoardsProps) => {
    const dispatch = useDispatch();
    const boardsPage = useSelector((state: AppState) => state.board.boardsPage);
    const [searchParam, setSearchParam] = useState(new BoardSearchParam());

    useEffect(() => {
        dispatch(actionCreators.SearchBoardRequested(searchParam));
    }, []);

    return (
        <div className="container">
            <div className={css.allBoardsMenu}>
                <h4>All Boards</h4>
                <Button type="primary">+ Add</Button>
            </div>
            <div className={css.boards}>
                {
                    boardsPage
                        ? boardsPage.items.map((b, i) => {
                            return (<Board key={i} board={b} onClick={() => { /* TODO redirect to board details */ }} />);
                        })
                        : null
                }
            </div>
        </div>
    );
}

export default AllBoards;