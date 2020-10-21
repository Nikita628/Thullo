import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { BaseProps } from '../../../common/data';
import { AppState } from '../../../state';
import { actionCreators, actionCreators as cardActionCreators } from "../../../state/card";
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
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        dispatch(cardActionCreators.GetCard(props.cardId));
    }, []);

    useEffect(() => {
        setTitle(card ? card.title : "");
    }, [card])

    const saveTitle = () => {
        if (title && title !== card.title) {
            dispatch(actionCreators.UpdateCardTitle(card.id, title));
        } else {
            setTitle(card.title);
        }
    }

    const saveDescription = (description: string) => {
        dispatch(actionCreators.UpdateCardDescription(card.id, description));
    }

    if (!card) return (
        <div className={css.spinner}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

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
                        <input
                            onChange={e => setTitle(e.target.value)}
                            onBlur={saveTitle}
                            type="text"
                            value={title}
                            className={css.title}
                        />
                        <p><strong>In list: </strong> {props.listTitle}</p>
                        <Description canEdit descriptionText={card.description} onSave={saveDescription} />
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