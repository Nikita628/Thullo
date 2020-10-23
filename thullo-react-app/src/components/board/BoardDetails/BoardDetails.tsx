import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actionCreators as commonActionCreators } from "../../../state/common";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { actionCreators as boardListActionCreators } from "../../../state/boardList";
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './BoardDetails.module.css';
import BoardTopMenu from '../BoardTopMenu/BoardTopMenu';
import BoardList from '../../boardList/BoardList/BoardList';
import Button from '../../common/ui/Button/Button';
import TitleCreation from '../../common/TitleCreation/TitleCreation';
import { BoardList as BoardListModel } from "../../../models/boardList";
import { DropZone } from '../../common/ui/DragAndDrop/Dropzone/Dropzone';
import { Card } from '../../../models/card';
import { actionCreators as cardActionCreators } from "../../../state/card";

interface BoardDetailsProps extends BaseProps {

}

const BoardDetails = (props: BoardDetailsProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const board = useSelector((state: AppState) => state.board.board);
    const boardLists = useSelector((state: AppState) => state.boardList.boardLists);
    const [isListCreationDisplayed, setIsListCreationDisplayed] = useState(false);

    useEffect(() => {
        dispatch(commonActionCreators.SetAppContext("boardDetails"));
        dispatch(boardActionCreators.GetBoardRequested(Number(id)));
        return () => {
            dispatch(boardActionCreators.DeleteBoardFromState());
        }
    }, []);

    const createBoardList = (title: string) => {
        const newList = new BoardListModel();
        newList.boardId = board.id;
        newList.title = title;
        dispatch(boardListActionCreators.CreateBoardList(newList));
        setIsListCreationDisplayed(false);
    }

    const moveCard = (card: Card, futureListId: number) => {
        if (card.boardListId !== futureListId) {
            dispatch(cardActionCreators.MoveCardToList(card.id, futureListId));
        }
    }

    if (!board) return (
        <div className={css.spinner}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className={concatCssClasses(css.boardDetails, props.className)}>
            <BoardTopMenu board={board} />

            <div className={css.boardLists}>
                {
                    boardLists.map(bl => (
                        <div className={css.boardListContainer} key={bl.id}>
                            <DropZone style={{ height: "100%" }} allowedDraggableType="card" onDrop={(d) => moveCard(d.draggableData, bl.id)}>
                                <BoardList boardList={bl} />
                            </DropZone>
                        </div>
                    ))
                }

                <div className={css.boardListContainer}>
                    {
                        isListCreationDisplayed
                            ? <TitleCreation
                                placeholder="Enter a title for this list"
                                onSave={createBoardList}
                                onCancel={() => setIsListCreationDisplayed(false)}
                            />
                            : <Button
                                onClick={() => setIsListCreationDisplayed(true)}
                                style={{ width: "100%", fontWeight: "bold" }}
                                type="primary-light"
                            > Add another list +
                             </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default BoardDetails;