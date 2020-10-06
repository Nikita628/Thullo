import React, { useState } from 'react';

import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import Button from '../ui/Button/Button';
import css from './TitleCreation.module.css';

interface TitleCreationProps extends BaseProps {
    placeholder: string;
    onSave: (title: string) => void;
}

const TitleCreation = (props: TitleCreationProps) => {
    const [title, setTitle] = useState("");

    const saveTitle = () => {
        if (title) {
            props.onSave(title);
        }
    }

    return (
        <div className={concatCssClasses(css.titleCreation, props.className)}>
            <input
                className={css.input}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder={props.placeholder}
            ></input>
            <Button onClick={saveTitle} type="success">Save</Button>
        </div>
    );
}

export default TitleCreation;