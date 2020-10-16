import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card } from '../../../../models/card';

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

interface ActionsProps extends BaseProps {
    card: Card;
}

const Actions = (props: ActionsProps) => {
    const dispatch = useDispatch();
    const card = useSelector((state: AppState) => state.card.card);
    const [isCoverDropdownOpened, setIsCoverDropdownOpened] = useState(false);
    const [isLabelDropdownOpened, setIsLabelDropdownOpened] = useState(false);

    const toggleCoverDropdown = () => {
        setIsCoverDropdownOpened(!isCoverDropdownOpened);
    }

    const toggleLabelDropdown = () => {
        setIsLabelDropdownOpened(!isLabelDropdownOpened);
    }

    return (
        <div className={concatCssClasses(css.actions, props.className)}>
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
                    {/* labels */}
                </DropdownContent>
            </Dropdown>

            {/* members */}
        </div>
    );
}

export default Actions;