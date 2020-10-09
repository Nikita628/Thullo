import React, { useCallback, useRef, useState } from 'react';

import { BaseProps } from '../../../../../common/data';
import { 
    DragAndDropData, 
    getCurrentCursorPosition, 
    getCursorPositionInsideElement 
} from '../DragAndDrop';
import css from './Draggable.module.css';
import { hub } from "../DragAndDrop";

interface DraggableProps extends BaseProps {
    onDragStart?: () => void;
    onDragging?: (coord: DragAndDropData) => void;
    onDragEnd?: (coord: DragAndDropData) => void;
    draggableType?: string;
    draggableData: any;
}

let cursorCoordInsideGhost: { x: number, y: number } = null;
let ghostSize: { width: number, height: number } = null;
let currentGhostCoord: DragAndDropData = null;

export const Draggable = (props: DraggableProps) => {
    const draggableRef = useRef<HTMLDivElement>();
    const ghostRef = useRef<HTMLDivElement>();
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = (e: React.MouseEvent<HTMLElement>) => {
        document.addEventListener("mousemove", drag);

        ghostSize = {
            width: draggableRef.current.offsetWidth,
            height: draggableRef.current.offsetHeight
        };
        currentGhostCoord = new DragAndDropData(
            draggableRef.current.offsetLeft,
            draggableRef.current.offsetTop,
            props.draggableType,
            props.draggableData
        );

        if (props.onDragStart) {
            props.onDragStart();
        }
    };

    const endDragging = (e: React.MouseEvent<HTMLElement>) => {
        document.removeEventListener("mousemove", drag);

        if (props.onDragEnd) {
            props.onDragEnd(currentGhostCoord);
        }

        currentGhostCoord = null;
        cursorCoordInsideGhost = null;
        ghostSize = null;

        setIsDragging(false);

        hub.clearHub();
    };

    const drag = useCallback((e: MouseEvent) => {
        if (!isDragging) {
            setIsDragging(true);
        }

        if (ghostRef) {
            const cursorPosition = getCurrentCursorPosition(e);
            const cursorInsideGhost = getCursorPositionInsideElement(e, draggableRef.current);

            if (!cursorCoordInsideGhost) {
                cursorCoordInsideGhost = cursorInsideGhost;
            }

            const newGhostCoord = new DragAndDropData(
                cursorPosition.x - cursorCoordInsideGhost.x,
                cursorPosition.y - cursorCoordInsideGhost.y,
                props.draggableType,
                props.draggableData
            );
            newGhostCoord.cursorX = cursorPosition.x;
            newGhostCoord.cursorY = cursorPosition.y;

            if (!ghostRef.current.style.width) {
                ghostRef.current.style.width = ghostSize.width + "px";
                ghostRef.current.style.height = ghostSize.height + "px";
            }

            ghostRef.current.style.left = newGhostCoord.x + "px";
            ghostRef.current.style.top = newGhostCoord.y + "px";

            currentGhostCoord = newGhostCoord;

            if (props.onDragging) {
                props.onDragging(currentGhostCoord);
            }

            hub.updateCurrentDraggable(newGhostCoord);
        }
    }, []);

    return (
        <div ref={draggableRef} className={css.draggable} onMouseDown={startDragging}>
            {props.children}
            {
                isDragging
                && <div onMouseUp={endDragging} onMouseLeave={endDragging} className={css.ghost} ref={ghostRef}>
                    {props.children}
                </div>
            }
        </div>
    );
}