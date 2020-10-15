import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import { actionCreators as cardActionCreators } from "../../../state/card";
import Description from '../../common/Description/Description';
import PhotoSearch from '../../common/PhotoSearch/PhotoSearch';
import Dropdown from '../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../common/ui/Icon/Icon';
import IconBadge from '../../common/ui/IconBadge/IconBadge';
import css from './CardDetails.module.css';

interface CardProps extends BaseProps {
    cardId: number;
    listTitle: string;
}

const CardDetails = (props: CardProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: AppState) => state.card.card);
    const [isCoverDropdownOpened, setIsCoverDropdownOpened] = useState(false);
    const [isLabelDropdownOpened, setIsLabelDropdownOpened] = useState(false);

    useEffect(() => {
        dispatch(cardActionCreators.GetCard(props.cardId));
    }, []);

    const toggleCoverDropdown = () => {
        setIsCoverDropdownOpened(!isCoverDropdownOpened);
    }

    const toggleLabelDropdown = () => {
        setIsLabelDropdownOpened(!isLabelDropdownOpened);
    }

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
                        {/* attachments, comments */}
                    </div>

                    <div className={css.actions}>
                        <IconBadge style={{ width: "100%", marginBottom: "0.5rem" }} icon="list-ul" text="Actions" />

                        <Dropdown style={{ width: "100%" }} onClickOutside={() => setIsCoverDropdownOpened(false)}>
                            <DropdownButton style={{ width: "100%" }} onClick={toggleCoverDropdown} type="secondary">
                                <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="file-image" /> Cover
                            </DropdownButton>
                            <DropdownContent isDisplayed={isCoverDropdownOpened} offsetY={10}>
                                <PhotoSearch onPhotoSelected={(photo) => { }} />
                            </DropdownContent>
                        </Dropdown>

                        <Dropdown style={{ width: "100%", margin: "0.5rem 0" }} onClickOutside={() => setIsLabelDropdownOpened(false)}>
                            <DropdownButton style={{ width: "100%" }} onClick={toggleLabelDropdown} type="secondary">
                                <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="list-ul" /> Label
                            </DropdownButton>
                            <DropdownContent isDisplayed={isLabelDropdownOpened} offsetY={10}>
                            </DropdownContent>
                        </Dropdown>

                        {/* members */}
                    </div>
                </div>
            </div>
            : null
    );
}

export default CardDetails;