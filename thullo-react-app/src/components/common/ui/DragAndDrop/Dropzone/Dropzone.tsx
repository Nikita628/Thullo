import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BaseProps } from '../../../../../common/data';
import { DragAndDropData } from '../DragAndDrop';
import css from './Dropzone.module.css';
import { hub } from "../DragAndDrop";
import { concatCssClasses } from '../../../../../common/functionality';

interface DropZoneProps extends BaseProps {
    allowedDraggableType: string;
    onDrop?: (draggableCoord: DragAndDropData) => void;
}

export const DropZone = (props: DropZoneProps) => {
    const _activeDragAndDropData = useRef<DragAndDropData>();
    const dropZoneRef = useRef<HTMLDivElement>();
    const [hasHoveringDraggable, setHasHoveringDraggable] = useState(false);

    useEffect(() => {
        document.addEventListener("mousemove", watchForDraggable);
        return () => document.removeEventListener("mousemove", watchForDraggable);
    }, []);

    const isInsideDropzone = (coord: DragAndDropData) => {
        return coord.cursorX > dropZoneRef.current.offsetLeft
            && coord.cursorX < (dropZoneRef.current.offsetLeft + dropZoneRef.current.offsetWidth)
            && coord.cursorY > dropZoneRef.current.offsetTop
            && coord.cursorY < (dropZoneRef.current.offsetTop + dropZoneRef.current.offsetHeight)
    }

    const watchForDraggable = useCallback((e: MouseEvent) => {
        _activeDragAndDropData.current = hub.getActiveDragAndDrop();

        if (_activeDragAndDropData.current
            && _activeDragAndDropData.current.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(_activeDragAndDropData.current)) {
                document.addEventListener("mouseup", watchForDraggableWasDropped);
                setHasHoveringDraggable(true);
            } else {
                document.removeEventListener("mouseup", watchForDraggableWasDropped);
                setHasHoveringDraggable(false);
            }
        }
    }, []);

    const watchForDraggableWasDropped = (e: MouseEvent) => {
        if (_activeDragAndDropData.current
            && _activeDragAndDropData.current.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(_activeDragAndDropData.current) && props.onDrop) {
                props.onDrop(_activeDragAndDropData.current);
            }
        }

        document.removeEventListener("mouseup", watchForDraggableWasDropped);
        setHasHoveringDraggable(false);
    };

    return (
        <div
            style={{ ...props.style }}
            ref={dropZoneRef}
            className={concatCssClasses(hasHoveringDraggable ? css.hovered : null, props.className)}
        >
            {props.children}
        </div>
    );
}