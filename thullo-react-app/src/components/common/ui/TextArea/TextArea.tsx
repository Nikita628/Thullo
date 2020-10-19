import React, { useEffect, useRef, useState } from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './TextArea.module.css';

interface TextAreaProps extends BaseProps {
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    text: string;
    readonly: boolean;
    isFocused: boolean;
}

const TextArea = (props: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const [text, setText] = useState(props.text);

    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [text]);

    useEffect(() => {
        if (props.isFocused && textAreaRef) {
            textAreaRef.current.focus();
        } else if (!props.isFocused && textAreaRef) {
            textAreaRef.current.blur();
        }
    }, [props.isFocused]);

    useEffect(() => {
        setText(props.text);
    }, [props.text]);

    const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText((prev) => newText);
        if (props.onChange) {
            props.onChange(newText);
        }
    }

    const exitTextArea = () => {
        if (props.onBlur) {
            props.onBlur(text);
        }
    }

    return (
        <textarea 
            ref={textAreaRef}
            className={concatCssClasses(css.textArea, props.className)}
            style={{...props.style}}
            onChange={updateText}
            onBlur={exitTextArea}
            readOnly={props.readonly}
            value={text}
        />
    );
}

export default TextArea;