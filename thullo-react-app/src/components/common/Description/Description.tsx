import React, { useState, useEffect, useRef } from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import Button from '../ui/Button/Button';
import IconBadge from '../ui/IconBadge/IconBadge';
import css from './Description.module.css';

interface DescriptionProps extends BaseProps {
    descriptionText: string;
    canEdit: boolean;
    onSave: (description: string) => void;
}

const defaultMinHeight = 30;

const Description = (props: DescriptionProps) => {
    const descriptionRef = useRef<HTMLTextAreaElement>();
    const [descriptionText, setDescriptionText] = useState(props.descriptionText ? props.descriptionText : "");
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        descriptionRef.current.style.height = "auto";
        const height = descriptionRef.current.scrollHeight > 0 ? descriptionRef.current.scrollHeight : defaultMinHeight;
        descriptionRef.current.style.height = height + "px";
    }, [descriptionText])

    const editDescription = () => {
        setIsEditingDescription(true);
        descriptionRef.current.focus();
    }

    const saveDescription = () => {
        setIsEditingDescription(false);

        if (descriptionText && descriptionText !== props.descriptionText) {
            props.onSave(descriptionText);
        } else {
            setDescriptionText(props.descriptionText);
        }
    }

    const cancelEditing = () => {
        setDescriptionText(props.descriptionText);
        setIsEditingDescription(false);
    }

    return (
        <div style={{ ...props.style }} className={concatCssClasses(css.description, props.className)}>

            <div>
                <IconBadge style={{ marginRight: "15px" }} icon="list-ul" text="Description" />
                {
                    props.canEdit
                    && <Button onClick={editDescription} style={{ padding: "2px 7px" }} type="secondary-outline">
                        <IconBadge icon="pencil-fill" text="Edit" />
                    </Button>
                }
            </div>

            {
                <textarea
                    style={{ display: (descriptionText || isEditingDescription) ? "block" : "none" }}
                    className={isEditingDescription ? css.editedDescription : ""}
                    onInput={(e: any) => setDescriptionText(e.target.value)}
                    ref={descriptionRef}
                    readOnly={!props.canEdit || !isEditingDescription}
                    value={descriptionText}
                />
            }

            {
                isEditingDescription
                && <div style={{ margin: "10px 0" }}>
                    <Button
                        style={{ padding: "2px 7px" }}
                        onClick={saveDescription}
                        type="success"
                    >Save
                    </Button>
                    {" "}
                    <Button
                        style={{ padding: "2px 7px" }}
                        onClick={cancelEditing}
                        type="light"
                    >Cancel
                    </Button>
                </div>
            }
        </div>
    );
}

export default Description;