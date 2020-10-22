import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CardAttachment } from '../../../../models/card';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses, formatDate } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
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
    const dispatch = useDispatch();
    const currentUser = useSelector((state: AppState) => state.auth.user);

    const createAttachment = (files: File[]) => {
        console.log("createatta");
        dispatch(cardActionCreators.CreateAttachment(props.cardId, files[0]));
    }

    return (
        <div className={concatCssClasses(css.attachments, props.className)}>
            <IconBadge style={{ width: "100%", margin: "20px 0 5px 0" }} icon="list-ul" text="Attachments" />
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
            <FilePicker style={{margin: "20px 0"}} isUploadEnabled maxNumberOfFiles={1} onUploadClick={createAttachment} />
        </div>
    );
}

export default Attachments;