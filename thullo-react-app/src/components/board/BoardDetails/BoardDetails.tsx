import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actionCreators as commonActionCreators } from "../../../state/common";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './BoardDetails.module.css';

interface BoardDetailsProps extends BaseProps {
    
}

const BoardDetails = (props: BoardDetailsProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const board = useSelector((state: AppState) => state.board.board);

    useEffect(() => {
        dispatch(commonActionCreators.SetAppContext("boardDetails"));
        dispatch(boardActionCreators.GetBoardRequested(Number(id)));
    }, [])

    if (!board) return null;

    return (
        <div className={concatCssClasses(css.boardDetails, props.className)}>
            {board.title}
        </div>
    );
}

export default BoardDetails;