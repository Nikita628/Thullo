import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './DragAndDrop.module.css';

export class DraggableCoordinates {
    x: number;
    y: number;
    id: string;

    constructor(x?: number, y?: number, id?: string) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.id = id ? id : null;
    }
}

interface DraggableProps extends BaseProps {
    onDragStart?: () => void;
    onDragging?: (coord: DraggableCoordinates) => void;
    onDragEnd?: (coord: DraggableCoordinates) => void;
    draggableId?: string;
}

let coordInsideDraggable: { x: number, y: number } = null;
let draggableSize: { width: number, height: number } = null;
let currentGhostCoord: DraggableCoordinates = null;

export const Draggable = (props: DraggableProps) => {
    const draggableRef = useRef<HTMLDivElement>();
    const ghostRef = useRef<HTMLDivElement>();
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = useCallback((e: React.MouseEvent<HTMLElement>) => {
        draggableRef.current.addEventListener("mousemove", drag);

        draggableSize = {
            width: draggableRef.current.offsetWidth,
            height: draggableRef.current.offsetHeight
        };
        currentGhostCoord = new DraggableCoordinates(
            draggableRef.current.offsetLeft,
            draggableRef.current.offsetTop,
            props.draggableId
        );

        if (props.onDragStart) {
            props.onDragStart();
        }
    }, []);

    const endDragging = useCallback((e: React.MouseEvent<HTMLElement>) => {
        draggableRef.current.removeEventListener("mousemove", drag);

        if (props.onDragEnd) {
            props.onDragEnd(currentGhostCoord);
        }

        currentGhostCoord = null;
        coordInsideDraggable = null;
        draggableSize = null;

        setIsDragging(false);
    }, []);

    const drag = useCallback((e: MouseEvent) => {
        if (!isDragging) {
            setIsDragging(true);
        }

        if (ghostRef) {
            const cursorPosition = getCurrentCursorPosition(e);
            const cursorPositionInsideDraggable = getCursorPositionInsideElement(e, draggableRef.current);

            if (!coordInsideDraggable) {
                coordInsideDraggable = cursorPositionInsideDraggable;
            }

            const newGhostCoord = new DraggableCoordinates(
                cursorPosition.x - coordInsideDraggable.x,
                cursorPosition.y - coordInsideDraggable.y,
                props.draggableId
            );
            
            if (!ghostRef.current.style.width) {
                ghostRef.current.style.width = draggableSize.width + "px";
                ghostRef.current.style.height = draggableSize.height + "px";
            }
           
            ghostRef.current.style.left = newGhostCoord.x + "px";
            ghostRef.current.style.top = newGhostCoord.y + "px";

            currentGhostCoord = newGhostCoord;

            if (props.onDragging) {
                props.onDragging(currentGhostCoord);
            }
        }
    }, []);

    return (
        <div
            ref={draggableRef}
            className={concatCssClasses(css.draggable, props.className)}
            style={{ ...props.style }}
            onMouseDown={startDragging}
            onMouseUp={endDragging}
        >
            {props.children}

            {
                isDragging
                && <div
                    onMouseLeave={endDragging}
                    className={concatCssClasses(css.ghost)}
                    ref={ghostRef}>
                    {props.children}
                </div>
            }
        </div>
    );
}

interface DropZoneProps extends BaseProps {
    activeDraggableCoord?: DraggableCoordinates;
    dropCoord?: DraggableCoordinates;
    allowedDraggableId?: string;
    onDrop?: (draggableId: string) => void;
}

export const DropZone = (props: DropZoneProps) => {
    const dropZoneRef = useRef<HTMLDivElement>();

    const isInsideDropzone = useCallback((coord: DraggableCoordinates) => {
        return false;
    }, []);

    return (
        <div ref={dropZoneRef} className={concatCssClasses(css.dropzone, props.className)} style={{ ...props.style }}>
            {props.children}
        </div>
    );
}

const getCurrentCursorPosition = (e: MouseEvent): { x: number, y: number } => {
    return {
        x: e.pageX,
        y: e.pageY
    };
}

const getCursorPositionInsideElement = (e: MouseEvent, elem: HTMLElement): { x: number, y: number } => {
    return {
        x: e.pageX - elem.offsetLeft,
        y: e.pageY - elem.offsetTop
    };
}