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
import Button from '../../common/ui/Button/Button';
import Backdrop from '../../common/ui/Modal/Backdrop/Backdrop';
import Modal from '../../common/ui/Modal/Modal';
import CardDetails from '../CardDetails/CardDetails';

interface CardProps extends BaseProps {
    card: CardModel;
}

const defaultNumberOfUserToDisplay = 2;

const Card = (props: CardProps) => {
    const [isUserSearchDropdownOpened, setIsUserSearchDropdownOpened] = useState(false);
    const [isCardDetailsDisplayed, setIsCardDetailsDisplayed] = useState(false);

    const toggleUserSearchDropdown = () => {
        setIsUserSearchDropdownOpened(!isUserSearchDropdownOpened);
    }

    const inviteUser = (user: User) => {
        setIsUserSearchDropdownOpened(false);
    }

    const displayCardDetails = (e: React.MouseEvent<HTMLElement>) => {
        setIsCardDetailsDisplayed(true);
    }

    const hideCardDetails = () => {
        setIsCardDetailsDisplayed(false);
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
                        {props.card.labels.map((cl, i) => <CardLabel key={i} cardlabel={cl} />)}
                    </div>
                    : null
            }

            <div className={css.usersMenu}>
                <UserImagesList amountOfUsersToDisplay={defaultNumberOfUserToDisplay} users={props.card.users} imgSize={30} />
                {
                    props.card.users.length > defaultNumberOfUserToDisplay
                    && <p className="text-muted mb-0 mr-3">+{props.card.users.length - defaultNumberOfUserToDisplay} others</p>
                }
                <Dropdown onClickOutside={() => setIsUserSearchDropdownOpened(false)}>
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

            {
                isCardDetailsDisplayed
                && <>
                    <Backdrop onClick={hideCardDetails} />
                    <Modal hasCloseButton onClose={hideCardDetails}>
                        <CardDetails cardId={props.card.id} />
                    </Modal>
                </>
            }
        </div>
    );
}

export default Card;