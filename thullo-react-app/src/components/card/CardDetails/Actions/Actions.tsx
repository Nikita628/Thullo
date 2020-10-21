import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Card, CardLabel } from '../../../../models/card';
import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import PhotoSearch from '../../../common/PhotoSearch/PhotoSearch';
import Dropdown from '../../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../../common/ui/Icon/Icon';
import IconBadge from '../../../common/ui/IconBadge/IconBadge';
import css from './Actions.module.css';
import CardLabelSearch from '../../CardLabelSearch/CardLabelSearch';
import Media from '../../../common/ui/Media/Media';
import { User } from '../../../../models/user';
import UserSearch from '../../../user/UserSearch/UserSearch';

interface ActionsProps extends BaseProps {
    card: Card;
}

const Actions = (props: ActionsProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: AppState) => state.card.card);
    const [isCoverDropdownOpened, setIsCoverDropdownOpened] = useState(false);
    const [isLabelDropdownOpened, setIsLabelDropdownOpened] = useState(false);
    const [isMemberDropdownOpened, setIsMemberDropdownOpened] = useState(false);

    const toggleCoverDropdown = () => {
        setIsCoverDropdownOpened(!isCoverDropdownOpened);
    }

    const toggleLabelDropdown = () => {
        setIsLabelDropdownOpened(!isLabelDropdownOpened);
    }

    const toggleMemberDropdown = () => {
        setIsMemberDropdownOpened(!isMemberDropdownOpened);
    }

    const addLabel = (label: CardLabel) => {
        dispatch(cardActionCreators.AddLabel(card.id, label));
        setIsLabelDropdownOpened(false);
    }

    return (
        <div className={concatCssClasses(css.actions, props.className)}>
            <IconBadge style={{ width: "100%", marginBottom: "0.5rem" }} icon="list-ul" text="Actions" />

            <Dropdown style={{ width: "100%" }} onClickOutside={() => setIsCoverDropdownOpened(false)}>
                <DropdownButton style={{ width: "100%" }} onClick={toggleCoverDropdown} type="secondary">
                    <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="file-image" /> Cover
                </DropdownButton>
                <DropdownContent isDisplayed={isCoverDropdownOpened} offsetY={10}>
                    <PhotoSearch onPhotoSelected={(photo) => dispatch(cardActionCreators.UpdateCardCoverUrl(card.id, photo.src.large2x)) } />
                </DropdownContent>
            </Dropdown>

            <Dropdown style={{ width: "100%", margin: "0.5rem 0" }} onClickOutside={() => setIsLabelDropdownOpened(false)}>
                <DropdownButton style={{ width: "100%" }} onClick={toggleLabelDropdown} type="secondary">
                    <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="list-ul" /> Label
                </DropdownButton>
                <DropdownContent isDisplayed={isLabelDropdownOpened} offsetY={10}>
                    <CardLabelSearch attachedLabels={card.labels} onAddLabel={addLabel} />
                </DropdownContent>
            </Dropdown>

            <div className={css.members}>
                <IconBadge style={{ width: "100%", marginBottom: "0.5rem" }} icon="list-ul" text="Members" />
                {
                    props.card.users.map(u =>
                        <Media
                            key={u.id}
                            style={{margin: "5px 0", width: "100%"}}
                            header={User.getFullName(u)}
                            imgSource={u.img?.url}
                            imgPlaceholder={User.getInitials(u)}
                            imgWidth="30px"
                            imgHeight="30px"
                        />
                    )
                }
                <Dropdown style={{ width: "100%", margin: "0.5rem 0" }} onClickOutside={() => setIsMemberDropdownOpened(false)}>
                    <DropdownButton style={{ width: "100%" }} onClick={toggleMemberDropdown} type="primary">
                        + Assign a member
                    </DropdownButton>
                    <DropdownContent isDisplayed={isMemberDropdownOpened} offsetY={10}>
                        <UserSearch searchType="Card" onUserConfirmationClick={() => {}} />
                    </DropdownContent>
                </Dropdown>
            </div>
        </div>
    );
}

export default Actions;