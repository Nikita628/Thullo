import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import { actionCreators as cardActionCreators } from "../../../state/card";
import css from './CardDetails.module.css';

interface CardProps extends BaseProps {
    cardId: number;
}

const CardDetails = (props: CardProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: AppState) => state.card.card);

    useEffect(() => {
        dispatch(cardActionCreators.GetCard(props.cardId));
    }, []);

    return (
        card
        && <div className={css.cardDetails}>

        </div>
    );
}

export default CardDetails;