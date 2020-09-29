import React, { useState } from 'react';

import css from './BoardList.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps } from '../../../common/data';
import { BoardList as BoardListModel } from '../../../models/boardList';
import Dropdown from '../../common/Dropdown/Dropdown';
import DropdownButton from '../../common/Dropdown/DropdownButton/DropdownButton';
import Icon from '../../common/Icon/Icon';
import DropdownContent from '../../common/Dropdown/DropdownContent/DropdownContent';
import Card from '../../card/Card/Card';

interface BoardListProps extends BaseProps {
    boardList: BoardListModel;
}

const BoardList = (props: BoardListProps) => {
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

    const toggleMenu = () => {
        setIsMenuDisplayed(!isMenuDisplayed);
    }

    return (
        <div key={props.key} className={concatCssClasses(css.boardList, props.className)}>

            <div className={css.boardListMenu}>
                <h5>{props.boardList.title}</h5>
                <Dropdown>
                    <DropdownButton onClick={toggleMenu} type="light"><Icon type="three-dots" /></DropdownButton>
                    <DropdownContent offsetY={5} isDisplayed={isMenuDisplayed}>
                        <div className={css.menuContent}>
                            <p>Rename</p>
                            <hr />
                            <p>Delete this list</p>
                        </div>
                    </DropdownContent>
                </Dropdown>
            </div>

            <div className={css.cards}>
                {
                    props.boardList.cards.map(c => (
                        <Card card={c} />
                    ))
                }
            </div>
        </div>
    );
}

export default BoardList;