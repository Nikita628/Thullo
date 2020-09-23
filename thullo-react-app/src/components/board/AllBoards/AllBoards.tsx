import React, { ReactNode, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { AppState } from '../../../state';
import Button from '../../common/Button/Button';
import css from './AllBoards.module.css';
import { actionCreators } from "../../../state/board";
import { BoardSearchParam } from '../../../models/board';
import Board from '../Board/Board';
import Modal from '../../common/Modal/Modal';
import PhotoSearch from '../../common/PhotoSearch/PhotoSearch';
import { PexelsPhoto } from '../../../models/common';
import Dropdown from '../../common/Dropdown/Dropdown';
import DropdownButton from '../../common/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../common/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../common/Icon/Icon';
import { BaseProps } from '../../../common/data';
import BoardVisibilityMenu from '../BoardVisibilityMenu/BoardVisibilityMenu';

interface AllBoardsProps extends BaseProps {

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
    const [isModalDisplayed, setIsModalDisplayed] = useState(false);
    const [isCoverDropdownOpened, setIsCoverDropdownOpened] = useState(false);
    const [isVisibilityDropdownOpened, setIsVisibilityDropdownOpened] = useState(false);

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

    const onAddButtonClick = () => {
        setIsModalDisplayed(true);
    }

    const onModalClose = () => {
        setIsModalDisplayed(false);
    }

    const onCoverDropdownClick = () => {
        setIsCoverDropdownOpened(!isCoverDropdownOpened);
    }

    const onVisibilityDropdownClick = () => {
        setIsVisibilityDropdownOpened(!isVisibilityDropdownOpened);
    }

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

            <Modal
                isDisplayed={isModalDisplayed}
                onClose={onModalClose}
            >
                <p>contsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsddfgfsdfent</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipi</p>
            </Modal>

            <Dropdown>
                <DropdownButton onClick={onCoverDropdownClick} type="secondary">
                    <Icon style={{marginBottom: "5px", marginRight: "10px"}} type="file-image" /> Cover
                </DropdownButton>
                <DropdownContent isDisplayed={isCoverDropdownOpened} offsetY={10}>
                    <PhotoSearch onPhotoSelected={(photo: PexelsPhoto) => { /* TODO use selected photo */ }} />
                </DropdownContent>
            </Dropdown>

            <Dropdown>
                <DropdownButton onClick={onVisibilityDropdownClick} type="secondary">
                    <Icon style={{marginBottom: "5px", marginRight: "10px"}} type="lock" /> Private
                </DropdownButton>
                <DropdownContent isDisplayed={isVisibilityDropdownOpened} offsetY={10}>
                    <BoardVisibilityMenu onVisibilityLevelChange={(visibility: string) => {}} />
                </DropdownContent>
            </Dropdown>

            <div className={css.allBoardsMenu}>
                <h4>All Boards</h4>
                <Button onClick={onAddButtonClick} type="primary">+ Add</Button>
            </div>
            <div className={css.boards}>
                {boards}
            </div>

        </div>
    );
}

export default AllBoards;