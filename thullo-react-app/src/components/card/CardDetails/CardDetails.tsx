import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import { actionCreators as cardActionCreators } from "../../../state/card";
import Description from '../../common/Description/Description';
import Actions from './Actions/Actions';
import Attachments from './Attachments/Attachments';
import css from './CardDetails.module.css';
import Comments from './Comments/Comments';

interface CardProps extends BaseProps {
    cardId: number;
    listTitle: string;
}

const CardDetails = (props: CardProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: AppState) => state.card.card);

    useEffect(() => {
        dispatch(cardActionCreators.GetCard(props.cardId));
    }, []);

    return (
        card && card.id === props.cardId
            ? <div className={css.cardDetails}>
                {
                    card.coverUrl
                        ? <img alt="" src={card.coverUrl} className={css.cover} />
                        : <div className={css.coverPlaceholder}>Cover Not Set</div>
                }

                <div className={css.body}>
                    <div className={css.content}>
                        <h2 className={css.title}>{card.title}</h2>
                        <p><strong>In list: </strong> {props.listTitle}</p>
                        <Description canEdit descriptionText={card.description} onSave={() => { }} />
                        <Attachments cardId={card.id} attachments={card.attachments} />
                        <Comments cardId={card.id} comments={card.comments} />
                    </div>

                    <Actions card={card} className={css.actions} />
                </div>
            </div>
            : null
    );
}

export default CardDetails;