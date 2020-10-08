import React, { useState } from 'react';

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

interface CardProps extends BaseProps {
    card: CardModel;
}

const defaultNumberOfUserToDisplay = 2;

const Card = (props: CardProps) => {
    const [isUserSearchDropdownOpened, setIsUserSearchDropdownOpened] = useState(false);

    const toggleUserSearchDropdown = () => {
        setIsUserSearchDropdownOpened(!isUserSearchDropdownOpened);
    }

    const handleUserInvited = (user: User) => {
        setIsUserSearchDropdownOpened(false);
    }

    return (
        <div key={props.card.id} className={concatCssClasses(css.card, props.className)}>
            {props.card.coverUrl && <img draggable={false} className={css.cardCover} src={props.card.coverUrl} alt="" />}

            <h6 className={css.cardTitle}>{props.card.title}</h6>

            <div className={css.labels}>
                {props.card.labels.map((cl, i) => (<CardLabel key={i} cardlabel={cl} />))}
            </div>

            <div className={css.usersMenu}>
                <UserImagesList amountOfUsersToDisplay={defaultNumberOfUserToDisplay} users={props.card.users} imgSize={30} />
                {
                    props.card.users.length > defaultNumberOfUserToDisplay
                    && <p className="text-muted mb-0 mr-3">+{props.card.users.length - defaultNumberOfUserToDisplay} others</p>
                }
                <Dropdown onClickOutside={() => setIsUserSearchDropdownOpened(false)}>
                    <DropdownButton style={{ width: "30px", height: "30px", padding: "0" }} onClick={toggleUserSearchDropdown} type="primary">
                        <Icon type="person-plus" />
                    </DropdownButton>
                    <DropdownContent isDisplayed={isUserSearchDropdownOpened} offsetY={10}>
                        <UserSearch searchType="Card" onUserConfirmationClick={handleUserInvited} />
                    </DropdownContent>
                </Dropdown>
            </div>
        </div>
    );
}

export default Card;