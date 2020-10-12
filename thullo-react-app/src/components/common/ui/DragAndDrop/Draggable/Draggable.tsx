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

export const Draggable = (props: DraggableProps) => {
    const _cursorCoordInsideGhost = useRef<{x: number, y: number}>();
    const _ghostSize = useRef<{width: number, height: number}>();
    const _currentGhostCoord = useRef<DragAndDropData>();

    const draggableRef = useRef<HTMLDivElement>();
    const ghostRef = useRef<HTMLDivElement>();
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = (e: React.MouseEvent<HTMLElement>) => {
        document.addEventListener("mousemove", drag);

        _ghostSize.current = {
            width: draggableRef.current.offsetWidth,
            height: draggableRef.current.offsetHeight
        };
        _currentGhostCoord.current = new DragAndDropData(
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
            props.onDragEnd(_currentGhostCoord.current);
        }
        _currentGhostCoord.current = null;
        _cursorCoordInsideGhost.current = null;
        _ghostSize.current = null;

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

            if (!_cursorCoordInsideGhost.current) {
                _cursorCoordInsideGhost.current = cursorInsideGhost;
            }

            const newGhostCoord = new DragAndDropData(
                cursorPosition.x - _cursorCoordInsideGhost.current.x,
                cursorPosition.y - _cursorCoordInsideGhost.current.y,
                props.draggableType,
                props.draggableData
            );
            newGhostCoord.cursorX = cursorPosition.x;
            newGhostCoord.cursorY = cursorPosition.y;

            if (!ghostRef.current.style.width) {
                ghostRef.current.style.width = _ghostSize.current.width + "px";
                ghostRef.current.style.height = _ghostSize.current.height + "px";
            }

            ghostRef.current.style.left = newGhostCoord.x + "px";
            ghostRef.current.style.top = newGhostCoord.y + "px";

            _currentGhostCoord.current = newGhostCoord;

            if (props.onDragging) {
                props.onDragging(_currentGhostCoord.current);
            }

            hub.updateActiveDragAndDrop(newGhostCoord);
        }
    }, [props.draggableData]);

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