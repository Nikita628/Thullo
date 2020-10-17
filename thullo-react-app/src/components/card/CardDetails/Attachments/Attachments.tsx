import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardAttachment } from '../../../../models/card';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses, formatDate } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import PhotoSearch from '../../../common/PhotoSearch/PhotoSearch';
import Dropdown from '../../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../../common/ui/Icon/Icon';
import IconBadge from '../../../common/ui/IconBadge/IconBadge';
import css from './Attachments.module.css';
import Media from '../../../common/ui/Media/Media';
import Button from '../../../common/ui/Button/Button';
import FilePicker from '../../../common/ui/FilePicker/FilePicker';

interface AttachmentsProps extends BaseProps {
    cardId: number;
    attachments: CardAttachment[];
}

const Attachments = (props: AttachmentsProps) => {
    const currentUser = useSelector((state: AppState) => state.auth.user);

    return (
        <div className={concatCssClasses(css.attachments, props.className)}>
            <IconBadge style={{ width: "100%", margin: "30px 0 5px 0" }} icon="list-ul" text="Attachments" />
            {
                props.attachments
                && props.attachments.map(a =>
                    <Media
                        style={{width: "100%", margin: "10px 0"}}
                        key={a.id}
                        header={a.file.name}
                        text={`Added ${formatDate(new Date(a.createdDate))}`}
                        imgPlaceholder={a.file.name.substr(0, 2).toUpperCase()}
                        imgWidth="110px"
                        imgHeight="70px"
                    >
                        <Button style={{marginTop: "5px"}} type="secondary-outline">Download</Button>
                        {" "}
                        {a.createdBy.id === currentUser.id && <Button type="secondary-outline">Delete</Button>}
                    </Media>
                )
            }
            <FilePicker style={{margin: "20px 0"}} isUploadEnabled maxNumberOfFiles={1} />
        </div>
    );
}

export default Attachments;