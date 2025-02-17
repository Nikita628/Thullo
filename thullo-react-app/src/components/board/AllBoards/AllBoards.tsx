import React, { ReactNode, useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppState } from '../../../state';
import Button from '../../common/ui/Button/Button';
import css from './AllBoards.module.css';
import { actionCreators } from "../../../state/board";
import { actionCreators as commonActionCreators } from "../../../state/common";
import { BoardSearchParam } from '../../../models/board';
import Board from '../Board/Board';
import Modal from '../../common/ui/Modal/Modal';
import { BaseProps } from '../../../common/data';
import BoardCreation from '../BoardCreation/BoardCreation';
import Transition, { AnimationState } from '../../common/ui/Transition/Transition';
import Backdrop from '../../common/ui/Modal/Backdrop/Backdrop';

interface AllBoardsProps extends BaseProps {

}

const defaultPageSize = 10;

const AllBoards = (props: AllBoardsProps) => {
    const _responseItemsTotalCount = useRef(0);
    const _searchParam = useRef(new BoardSearchParam());
    const history = useHistory();
    const dispatch = useDispatch();
    const boardsPage = useSelector((state: AppState) => state.board.boardsPage);
    const [searchParam, setSearchParam] = useState({ param: new BoardSearchParam(), appendToExistingBoardPage: false });
    const [isModalDisplayed, setIsModalDisplayed] = useState(false);

    _responseItemsTotalCount.current = boardsPage.totalCount;
    _searchParam.current = searchParam.param;

    const getNextPage = useCallback(() => {
        const totalPageHeight = document.body.scrollHeight;
        const scrollPoint = Math.ceil(window.scrollY + window.innerHeight);
        const isScrolledToBottom = scrollPoint >= totalPageHeight;
        const totalPages = Math.ceil(_responseItemsTotalCount.current / defaultPageSize);
        const hasMorePagesToRequest = _searchParam.current.pageNumber < totalPages;

        if (isScrolledToBottom && hasMorePagesToRequest) {
            const newSearchParam: BoardSearchParam = {
                ..._searchParam.current,
                pageNumber: _searchParam.current.pageNumber + 1
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

    const createBoard = () => {
        const param = new BoardSearchParam();
        setSearchParam({ param: param, appendToExistingBoardPage: false });
        closeBoardCreationModal();
    }

    const searchBoards = () => {
        dispatch(
            actionCreators.SearchBoardRequested(searchParam.param, searchParam.appendToExistingBoardPage)
        );
    }

    const openBoardDetails = (boardId: number) => {
        history.push(`/board/${boardId}`);
    }

    useEffect(() => {
        window.addEventListener("scroll", getNextPage);
        dispatch(commonActionCreators.SetAppContext("allBoards"));
        return () => {
            window.removeEventListener("scroll", getNextPage);
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
                        onClick={() => openBoardDetails(boardsPage.items[i].id)}
                    />
                </div>
            );
        }
    }

    return (
        <div className="container">
            {isModalDisplayed && <Backdrop onClick={closeBoardCreationModal} />}

            <Transition isIn={isModalDisplayed} timeoutMs={300}>
                {
                    (state) => {
                        let animationClassName = "";
                        if (state === AnimationState.exited) {
                            animationClassName = css.modalClosed;
                        } else if (state === AnimationState.exiting) {
                            animationClassName = css.modalClosing;
                        } else if (state === AnimationState.entering) {
                            animationClassName = css.modalOpening;
                        }

                        return (
                            <Modal hasCloseButton onClose={closeBoardCreationModal} className={animationClassName}>
                                <BoardCreation onCreate={createBoard} onCancel={closeBoardCreationModal} />
                            </Modal>
                        );
                    }
                }
            </Transition>

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