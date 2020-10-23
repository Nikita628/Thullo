import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import css from './Card.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps } from '../../../common/data';
import { Card as CardModel } from '../../../models/card';
import CardLabel from '../CardLabel/CardLabel';
import UserImagesList from '../../user/UserImagesList/UserImagesList';
import Dropdown from '../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../common/ui/Dropdown/DropdownButton/DropdownButton';
import Icon from '../../common/ui/Icon/Icon';
import DropdownContent from '../../common/ui/Dropdown/DropdownContent/DropdownContent';
import UserSearch from '../../user/UserSearch/UserSearch';
import { User } from '../../../models/user';
import Button from '../../common/ui/Button/Button';
import { actionCreators as userActionCreators } from "../../../state/user";
import IconBadge from '../../common/ui/IconBadge/IconBadge';

interface CardProps extends BaseProps {
    card: CardModel;
    listTitle: string;
    onOpenDetails: () => void;
}

const defaultNumberOfUserToDisplay = 2;

const Card = (props: CardProps) => {
    const dispatch = useDispatch();
    const [isUserSearchDropdownOpened, setIsUserSearchDropdownOpened] = useState(false);

    const toggleUserSearchDropdown = () => {
        setIsUserSearchDropdownOpened(!isUserSearchDropdownOpened);
    }

    const inviteUser = (user: User) => {
        if (!props.card.users.some(u => u.id === user.id)) {
            dispatch(userActionCreators.InviteToCard(user, props.card.id));
            setIsUserSearchDropdownOpened(false);
        }
    }

    const displayCardDetails = (e: React.MouseEvent<HTMLElement>) => {
        props.onOpenDetails();
    }

    return (
        <div key={props.card.id} className={concatCssClasses(css.card, props.className)}>
            {props.card.coverUrl && <img onDragStart={(e) => e.preventDefault()} draggable={false} className={css.cardCover} src={props.card.coverUrl} alt="" />}

            <Button type="link" onClick={displayCardDetails} onMouseDown={e => e.stopPropagation()}>
                <h6 className={css.cardTitle}>{props.card.title}</h6>
            </Button>

            {
                (props.card.labels && props.card.labels.length)
                    ? <div className={css.labels}>
                        {props.card.labels.map(cl => <div key={cl.id} className={css.labelContainer}><CardLabel cardlabel={cl} /></div>)}
                    </div>
                    : null
            }

            <div className={css.usersMenu}>
                <div className={css.users}>
                    <UserImagesList amountOfUsersToDisplay={defaultNumberOfUserToDisplay} users={props.card.users} imgSize={30} />
                    {
                        props.card.users.length > defaultNumberOfUserToDisplay
                        && <p className="text-muted mb-0 mr-3">+{props.card.users.length - defaultNumberOfUserToDisplay} others</p>
                    }
                    <Dropdown style={{ marginRight: "10px" }} onClickOutside={() => setIsUserSearchDropdownOpened(false)}>
                        <DropdownButton
                            style={{ width: "30px", height: "30px", padding: "0" }}
                            onClick={toggleUserSearchDropdown}
                            onMouseDown={e => e.stopPropagation()}
                            type="primary"
                        >
                            <Icon type="person-plus" />
                        </DropdownButton>
                        <DropdownContent isDisplayed={isUserSearchDropdownOpened} offsetY={10}>
                            <UserSearch searchType="Card" onUserConfirmationClick={inviteUser} />
                        </DropdownContent>
                    </Dropdown>
                </div>
                <div className={css.icons}>
                    {!!props.card?.comments.length && <IconBadge icon="chat-left-text" text={props.card?.comments.length.toString()} />}
                    {" "}
                    {!!props.card?.attachments.length && <IconBadge icon="file-earmark-plus" text={props.card?.attachments.length.toString()} />}
                </div>
            </div>
        </div>
    );
}

export default Card;