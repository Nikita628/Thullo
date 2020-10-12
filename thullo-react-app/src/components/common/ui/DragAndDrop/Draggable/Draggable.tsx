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
    const _cursorCoordInsideGhost = useRef<{ x: number, y: number }>();
    const _ghostSize = useRef<{ width: number, height: number }>();
    const _ghostData = useRef<DragAndDropData>();

    const draggableRef = useRef<HTMLDivElement>();
    const ghostRef = useRef<HTMLDivElement>();
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = () => {
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDragging);

        _ghostSize.current = {
            width: draggableRef.current.offsetWidth,
            height: draggableRef.current.offsetHeight
        };
        _ghostData.current = new DragAndDropData(
            draggableRef.current.offsetLeft,
            draggableRef.current.offsetTop,
            props.draggableType,
            props.draggableData
        );

        if (props.onDragStart) {
            props.onDragStart();
        }
    };

    const endDragging = useCallback(() => {
        document.removeEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDragging);

        if (props.onDragEnd) {
            props.onDragEnd(_ghostData.current);
        }
        _ghostData.current = null;
        _cursorCoordInsideGhost.current = null;
        _ghostSize.current = null;

        setIsDragging(false);

        hub.clearHub();
    }, []);

    const drag = useCallback((e: MouseEvent) => {
        if (!isDragging) {
            setIsDragging(true);
        }

        if (ghostRef.current) {
            const cursorPosition = getCurrentCursorPosition(e);
            const cursorInsideGhost = getCursorPositionInsideElement(e, draggableRef.current);

            if (!_cursorCoordInsideGhost.current) {
                _cursorCoordInsideGhost.current = cursorInsideGhost;
            }

            const newGhostData = new DragAndDropData(
                cursorPosition.x - _cursorCoordInsideGhost.current.x,
                cursorPosition.y - _cursorCoordInsideGhost.current.y,
                _ghostData.current.draggableType,
                _ghostData.current.draggableData,
                cursorPosition.x,
                cursorPosition.y
            );

            if (!ghostRef.current.style.width
                || !ghostRef.current.style.height) {
                ghostRef.current.style.width = _ghostSize.current.width + "px";
                ghostRef.current.style.height = _ghostSize.current.height + "px";
            }

            ghostRef.current.style.left = newGhostData.x + "px";
            ghostRef.current.style.top = newGhostData.y + "px";

            _ghostData.current = newGhostData;

            if (props.onDragging) {
                props.onDragging(_ghostData.current);
            }

            hub.updateActiveDragAndDrop(newGhostData);
        }
    }, []);

    return (
        <div ref={draggableRef} className={css.draggable} onMouseDown={startDragging}>
            {props.children}
            {
                isDragging
                && <div onMouseLeave={endDragging} className={css.ghost} ref={ghostRef}>
                    {props.children}
                </div>
            }
        </div>
    );
}