export class DragAndDropData {
    x: number;
    y: number;
    draggableType: string;
    draggableData: any;
    cursorX: number;
    cursorY: number;

    constructor(x?: number, y?: number, id?: string, data?: any) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.draggableType = id;
        this.draggableData = data;
    }
}

export const getCurrentCursorPosition = (e: MouseEvent): { x: number, y: number } => {
    return {
        x: e.pageX,
        y: e.pageY
    };
}

export const getCursorPositionInsideElement = (e: MouseEvent, elem: HTMLElement): { x: number, y: number } => {
    return {
        x: e.pageX - elem.offsetLeft,
        y: e.pageY - elem.offsetTop
    };
}

export class DragAndDropHub {
    private draggable: DragAndDropData;

    public clearHub() {
        this.draggable = null;
    }

    public getCurrentDraggable() {
        return this.draggable;
    }

    public updateCurrentDraggable(draggable: DragAndDropData) {
        this.draggable = draggable;
    }
}

let hub = new DragAndDropHub();

export { hub }