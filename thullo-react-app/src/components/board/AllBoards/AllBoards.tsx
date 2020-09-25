import React, { ReactNode, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppState } from '../../../state';
import Button from '../../common/Button/Button';
import css from './AllBoards.module.css';
import { actionCreators } from "../../../state/board";
import { actionCreators as commonActionCreators } from "../../../state/common";
import { BoardSearchParam } from '../../../models/board';
import Board from '../Board/Board';
import Modal from '../../common/Modal/Modal';
import { BaseProps } from '../../../common/data';
import BoardCreation from '../BoardCreation/BoardCreation';

interface AllBoardsProps extends BaseProps {

}

const defaultPageSize = 10;
const pagingState = {
    responseItemsTotalCount: 0,
    searchParam: new BoardSearchParam(),
};

const updatePagingState = (responseItemsTotalCount: number, searchParam: BoardSearchParam) => {
    pagingState.responseItemsTotalCount = responseItemsTotalCount;
    pagingState.searchParam = searchParam;
}

const AllBoards = (props: AllBoardsProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const boardsPage = useSelector((state: AppState) => state.board.boardsPage);
    const [searchParam, setSearchParam] = useState({ param: new BoardSearchParam(), appendToExistingBoardPage: false });
    const [isModalDisplayed, setIsModalDisplayed] = useState(false);

    updatePagingState(boardsPage.totalCount, searchParam.param);

    const onPageScroll = useCallback(() => {
        const totalPageHeight = document.body.scrollHeight;
        const scrollPoint = window.scrollY + window.innerHeight;
        const isScrolledToBottom = scrollPoint >= totalPageHeight;
        const totalPages = Math.ceil(pagingState.responseItemsTotalCount / defaultPageSize);
        const hasMorePagesToRequest = pagingState.searchParam.pageNumber < totalPages;

        if (isScrolledToBottom && hasMorePagesToRequest) {
            const newSearchParam: BoardSearchParam = {
                ...pagingState.searchParam,
                pageNumber: pagingState.searchParam.pageNumber + 1
            };
            setSearchParam({ param: newSearchParam, appendToExistingBoardPage: true });
        }
    }, []);

    const displayBoardCreationModal = () => {
        setIsModalDisplayed(true);
    }

    const closeBoardCreationModal = () => {
        setIsModalDisplayed(false);
    }

    const handleBoardCreation = () => {
        const param = new BoardSearchParam();
        setSearchParam({ param: param, appendToExistingBoardPage: false });
        closeBoardCreationModal();
    }

    const searchBoards = () => {
        dispatch(
            actionCreators.SearchBoardRequested(searchParam.param, searchParam.appendToExistingBoardPage)
        );
    }

    const handleBoardClick = (boardId: number) => {
        history.push(`/board/${boardId}`);
    }

    useEffect(() => {
        window.addEventListener("scroll", onPageScroll);
        dispatch(commonActionCreators.SetAppContext("allBoards"));
        return () => {
            window.removeEventListener("scroll", onPageScroll);
        }
    }, []);

    useEffect(searchBoards, [searchParam]);

    const boards: ReactNode[] = [];

    if (boardsPage) {
        for (let i = 0; i < boardsPage.items.length; i++) {
            boards.push(
                <div key={i} className={css.boardContainer}>
                    <Board
                        className={css.board}
                        board={boardsPage.items[i]}
                        onClick={() => handleBoardClick(boardsPage.items[i].id)}
                    />
                </div>
            );
        }
    }

    return (
        <div className="container">

            <Modal
                isDisplayed={isModalDisplayed}
                onClose={closeBoardCreationModal}
            >
                <BoardCreation onCreate={handleBoardCreation} onCancel={closeBoardCreationModal} />
            </Modal>

            <div className={css.allBoardsMenu}>
                <h4>All Boards</h4>
                <Button onClick={displayBoardCreationModal} type="primary">+ Add</Button>
            </div>
            <div className={css.boards}>
                {boards}
            </div>

        </div>
    );
}

export default AllBoards;