import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { AppState } from '../../../state';
import Button from '../../common/Button/Button';
import css from './AllBoards.module.css';
import { actionCreators } from "../../../state/board";
import { BoardSearchParam } from '../../../models/board';
import Board from '../Board/Board';

interface AllBoardsProps {

}

const numberOfBoardsPerRow = 3;

const AllBoards = (props: AllBoardsProps) => {
    const dispatch = useDispatch();
    const boardsPage = useSelector((state: AppState) => state.board.boardsPage);
    const [searchParam, setSearchParam] = useState(new BoardSearchParam());

    useEffect(() => {
        dispatch(actionCreators.SearchBoardRequested(searchParam));
    }, []);

    const boards: ReactNode[] = [];
    let numberOfEmptyBoards = 0;

    if (boardsPage) {
        const numberOfBoardsOnLastRow = boardsPage.items.length % numberOfBoardsPerRow;
        
        if (numberOfBoardsOnLastRow) {
            numberOfEmptyBoards = numberOfBoardsPerRow - numberOfBoardsOnLastRow;
        }

        for (let i = 0; i < boardsPage.items.length; i++) {
            boards.push(
                <Board className={css.board} key={i} board={boardsPage.items[i]} onClick={() => { /* TODO redirect to board details */ }} />
            );
        }
        
        for (let i = 0; i < numberOfEmptyBoards; i++) {
            boards.push(
                <div className={css.emptyBoard}></div>
            );      
        }
    }

    return (
        <div className="container">
            <div className={css.allBoardsMenu}>
                <h4>All Boards</h4>
                <Button type="primary">+ Add</Button>
            </div>
            <div className={css.boards}>
                {boards}
            </div>
        </div>
    );
}

export default AllBoards;