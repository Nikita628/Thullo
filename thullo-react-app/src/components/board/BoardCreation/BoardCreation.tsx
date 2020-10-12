import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { BaseProps, BoardVisibility } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { PexelsPhoto } from '../../../models/common';
import Button from '../../common/ui/Button/Button';
import Dropdown from '../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../common/ui/Icon/Icon';
import Input from '../../common/ui/Input/Input';
import PhotoSearch from '../../common/PhotoSearch/PhotoSearch';
import BoardVisibilityMenu from '../BoardVisibilityMenu/BoardVisibilityMenu';
import { actionCreators } from "../../../state/board";
import css from './BoardCreation.module.css';
import { Board } from '../../../models/board';

interface BoardCreationProps extends BaseProps {
    onCreate: () => void;
    onCancel: () => void;
}

const BoardCreation = (props: BoardCreationProps) => {
    const dispatch = useDispatch();
    const [isCoverDropdownOpened, setIsCoverDropdownOpened] = useState(false);
    const [isVisibilityDropdownOpened, setIsVisibilityDropdownOpened] = useState(false);
    const [selectedCover, setSelectedCover] = useState<PexelsPhoto>();
    const [visibility, setVisibility] = useState<BoardVisibility>(BoardVisibility.private);
    const [title, setTitle] = useState<string>();
    const [titleError, setTitleError] = useState<string>();
    const [coverError, setCoverErrror] = useState<string>();

    const toggleCoverDropdown = () => {
        setIsCoverDropdownOpened(!isCoverDropdownOpened);
    }

    const toggleVisibilityDropdown = () => {
        setIsVisibilityDropdownOpened(!isVisibilityDropdownOpened);
    }

    const selectCover = (photo: PexelsPhoto) => {
        setCoverErrror(undefined);
        setSelectedCover(photo);
        setIsCoverDropdownOpened(false);
    }

    const changeVisibility = (visibility: BoardVisibility) => {
        setVisibility(visibility);
        setIsVisibilityDropdownOpened(false);
    }

    const createBoard = () => {
        if (!title) {
            setTitleError("Please enter title");
        }

        if (!selectedCover) {
            setCoverErrror("Please select cover");
        }

        if (title && selectedCover) {
            const board = new Board();
            board.title = title;
            board.coverUrl = selectedCover.src.medium;
            board.isPrivate = visibility === BoardVisibility.private;
            dispatch(actionCreators.CreateBoardRequested(board, () => props.onCreate()))
        }
    }

    const cancelBoardCreation = () => {
        props.onCancel();
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (titleError) {
            setTitleError(undefined);
        }

        setTitle(e.target.value);
    }

    return (
        <div className={concatCssClasses(css.boardCreation, props.className)}>

            {
                selectedCover
                    ? <img alt="" className={css.coverImg} src={selectedCover.src.medium} />
                    : <div className={concatCssClasses(css.coverPlaceholder, coverError ? css.invalidCover : "")}>Cover not selected</div>
            }

            <div className={css.titleInputContainer}>
                <Input onChange={changeTitle} isInvalid={!!titleError} type="text" style={{ width: "100%" }} />
                <p className={css.titleError}>{titleError}</p>
            </div>

            <div className={css.boardMenu}>
                <Dropdown onClickOutside={() => setIsCoverDropdownOpened(false)}>
                    <DropdownButton onClick={toggleCoverDropdown} type="secondary">
                        <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="file-image" /> Cover
                </DropdownButton>
                    <DropdownContent isDisplayed={isCoverDropdownOpened} offsetY={10}>
                        <PhotoSearch onPhotoSelected={selectCover} />
                    </DropdownContent>
                </Dropdown>

                <Dropdown onClickOutside={() => setIsVisibilityDropdownOpened(false)}>
                    <DropdownButton onClick={toggleVisibilityDropdown} type="secondary">
                        {
                            visibility === BoardVisibility.public
                                ? <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="unlock" />
                                : <Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="lock" />
                        }
                        {visibility}
                    </DropdownButton>
                    <DropdownContent isDisplayed={isVisibilityDropdownOpened} offsetY={10}>
                        <BoardVisibilityMenu onVisibilityChange={changeVisibility} />
                    </DropdownContent>
                </Dropdown>
            </div>

            <div className={css.creationButtons}>
                <Button onClick={cancelBoardCreation} type="light">Cancel</Button>{" "}
                <Button onClick={createBoard} type="primary">+ Create</Button>
            </div>

        </div>
    );
}

export default BoardCreation;