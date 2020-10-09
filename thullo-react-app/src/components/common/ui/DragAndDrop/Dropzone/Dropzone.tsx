import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BaseProps } from '../../../../../common/data';
import { DragAndDropData } from '../DragAndDrop';
import css from './Dropzone.module.css';
import { hub } from "../DragAndDrop";

interface DropZoneProps extends BaseProps {
    allowedDraggableType: string;
    onDrop?: (draggableCoord: DragAndDropData) => void;
}

export const DropZone = (props: DropZoneProps) => {
    const dropZoneRef = useRef<HTMLDivElement>();
    const [hasHoveringDraggable, setHasHoveringDraggable] = useState(false);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    const isInsideDropzone = (coord: DragAndDropData) => {
        return coord.cursorX > dropZoneRef.current.offsetLeft
            && coord.cursorX < (dropZoneRef.current.offsetLeft + dropZoneRef.current.offsetWidth)
            && coord.cursorY > dropZoneRef.current.offsetTop
            && coord.cursorY < (dropZoneRef.current.offsetTop + dropZoneRef.current.offsetHeight)
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const currentDraggable = hub.getCurrentDraggable();

        if (currentDraggable && currentDraggable.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(currentDraggable)) {
                setHasHoveringDraggable(true);
            } else {
                setHasHoveringDraggable(false);
            }
        }
    }, []);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        const currentDraggable = hub.getCurrentDraggable();

        if (currentDraggable && currentDraggable.draggableType === props.allowedDraggableType) {
            if (isInsideDropzone(currentDraggable) && props.onDrop) {
                props.onDrop(hub.getCurrentDraggable());
            }
        }

        setHasHoveringDraggable(false);
    }, []);

    return (
        <div ref={dropZoneRef} className={hasHoveringDraggable ? css.hovered : ""}>
            {props.children}
        </div>
    );
}