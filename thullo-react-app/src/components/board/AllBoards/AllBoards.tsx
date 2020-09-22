import React, { ReactNode, useEffect, useCallback, useState } from 'react';
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
const pagingState = {
    responseItemsTotalCount: 0,
    pageSize: 0,
    pageNumber: 0,
};

// hack to access freshest paging state inside of "onPageScroll" closure
const updatePagingState = (responseItemsTotalCount: number, pageNumber: number, pageSize: number) => {
    pagingState.responseItemsTotalCount = responseItemsTotalCount;
    pagingState.pageNumber = pageNumber;
    pagingState.pageSize = pageSize;
}

const AllBoards = (props: AllBoardsProps) => {
    const dispatch = useDispatch();
    const boardsPage = useSelector((state: AppState) => state.board.boardsPage);
    const [searchParam, setSearchParam] = useState(new BoardSearchParam());

    updatePagingState(boardsPage.totalCount, searchParam.pageNumber, searchParam.pageSize);

    const onPageScroll = useCallback(() => {
        const totalPageHeight = document.body.scrollHeight;
        const scrollPoint = window.scrollY + window.innerHeight;
        const isScrolledToBottom = scrollPoint >= totalPageHeight;
        const totalPages = Math.ceil(pagingState.responseItemsTotalCount / pagingState.pageSize);
        const hasMorePagesToRequest = pagingState.pageNumber < totalPages;

        if (isScrolledToBottom && hasMorePagesToRequest) {
            const param = new BoardSearchParam();
            pagingState.pageNumber++;
            param.pageNumber = pagingState.pageNumber;
            setSearchParam(param);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onPageScroll);
        dispatch(actionCreators.SearchBoardRequested(searchParam));
        return () => {
            window.removeEventListener("scroll", onPageScroll);
        }
    }, []);

    useEffect(() => {
        dispatch(actionCreators.SearchBoardRequested(searchParam));
    }, [searchParam]);

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