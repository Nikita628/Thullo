import React from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import Icon from '../../common/Icon/Icon';
import css from './BoardVisibilityMenu.module.css';

interface BoardVisibilityMenuProps extends BaseProps {
    onVisibilityLevelChange: (visibility: "private" | "public") => void;
}

const BoardVisibilityMenu = (props: BoardVisibilityMenuProps) => {
    return (
        <div className={concatCssClasses(css.boardVisibilityMenu, props.className)}>
            <h6>Visibility</h6>
            <p className="text-muted">Choose who can see this board</p>
            <div onClick={() => props.onVisibilityLevelChange("public")} className={css.visibilityOption}>
                <h6><Icon type="unlock" /> Public</h6>
                <p className="text-muted mb-0">Anyone on the Internet can see this</p>
            </div>
            <div onClick={() => props.onVisibilityLevelChange("private")} className={css.visibilityOption}>
                <h6><Icon type="lock" /> Private</h6>
                <p className="text-muted mb-0">Only board members can see this</p>
            </div>
        </div>
    );
}

export default BoardVisibilityMenu;