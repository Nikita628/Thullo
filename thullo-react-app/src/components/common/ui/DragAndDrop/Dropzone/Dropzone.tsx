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

let relevantDragAndDrop: DragAndDropData;

export const DropZone = (props: DropZoneProps) => {
    const dropZoneRef = useRef<HTMLDivElement>();
    const [hasHoveringDraggable, setHasHoveringDraggable] = useState(false);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const isInsideDropzone = (coord: DragAndDropData) => {
        return coord.cursorX > dropZoneRef.current.offsetLeft
            && coord.cursorX < (dropZoneRef.current.offsetLeft + dropZoneRef.current.offsetWidth)
            && coord.cursorY > dropZoneRef.current.offsetTop
            && coord.cursorY < (dropZoneRef.current.offsetTop + dropZoneRef.current.offsetHeight)
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        relevantDragAndDrop = hub.getActiveDragAndDrop();

        if (relevantDragAndDrop && relevantDragAndDrop.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(relevantDragAndDrop)) {
                document.addEventListener("mouseup", handleMouseUp);
                setHasHoveringDraggable(true);
            } else {
                document.removeEventListener("mouseup", handleMouseUp);
                setHasHoveringDraggable(false);
            }
        }
    }, []);

    const handleMouseUp = (e: MouseEvent) => {
        if (relevantDragAndDrop && relevantDragAndDrop.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(relevantDragAndDrop) && props.onDrop) {
                props.onDrop(relevantDragAndDrop);
            }
        }

        document.removeEventListener("mouseup", handleMouseUp);
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