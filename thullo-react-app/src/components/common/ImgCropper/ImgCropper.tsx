import React, { useState, useEffect, useRef } from 'react';
import css from './ImgCropper.module.css';

interface ImgCropperProps {
    img: File;
    cropType: "square" | "free";
    minWidth: number;
    minHeight: number;
    onImgCropped: (croppedImg: File) => void;
}

interface Point {
    x: number;
    y: number;
}

let originalImage: HTMLImageElement;
let isDragging = false;
let isResizing = false;

let initialMousePositionInRect: Point = {
    x: 0,
    y: 0
};

let rectCurrentPosition: Point = {
    x: 0,
    y: 0
};

let rectWidth: number;
let rectHeight: number;

let canvasWidth = 0;
let canvasHeight = 0;

const resizeButtonRadius = 8;
const defaultImageWidth = 400;
const defaultImageHeight = 300;

const ImgCropper = (props: ImgCropperProps) => {
    if (props.cropType === "square" && props.minHeight !== props.minWidth) {
        throw Error("For the square crop the minHeight and minWidth must be the same");
    }

    if (!props.img.type.includes("image")) {
        throw Error("Only images can be cropped");
    }

    rectWidth = props.minWidth;
    rectHeight = props.minHeight;

    const [originalImageSrc, setOriginalImageSrc] = useState<string>();
    const [croppedImageSrc, setCroppedImageSrc] = useState<string>();
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(props.img);
        reader.onloadend = () => {
            const imgSrc = reader.result as string;
            const inputImage = new Image();

            inputImage.onload = () => {
                scaleImageToDefault(inputImage)
                    .then((img: { scaledImg: HTMLImageElement, scaledImgSrc: string }) => {
                        originalImage = img.scaledImg;
                        canvasWidth = img.scaledImg.naturalWidth;
                        canvasHeight = img.scaledImg.naturalHeight;
                        canvasRef.current.width = img.scaledImg.naturalWidth;
                        canvasRef.current.height = img.scaledImg.naturalHeight;

                        draw();
                        setOriginalImageSrc(img.scaledImgSrc);
                    });
            };

            inputImage.src = imgSrc;
        };
    }, [props.img]);

    useEffect(() => {
        if (!croppedImageSrc && originalImage && canvasRef.current) {
            canvasRef.current.width = originalImage.naturalWidth;
            canvasRef.current.height = originalImage.naturalHeight;
            draw();
        }
    }, [croppedImageSrc]);

    const scaleImageToDefault = (img: HTMLImageElement) => {
        return new Promise((resolve: (scaledImg: any) => void, reject) => {
            let width = img.width;
            let height = img.height;

            if (img.width >= img.height) {
                const scaleFactor = img.width / defaultImageWidth;
                width /= scaleFactor;
                height /= scaleFactor;
            } else if (img.height >= img.width) {
                const scaleFactor = img.height / defaultImageHeight;
                width /= scaleFactor;
                height /= scaleFactor;
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            const resizedImage = new Image();
            const resizedImageSrc = canvas.toDataURL();

            resizedImage.onload = () => {
                resolve({ scaledImg: resizedImage, scaledImgSrc: resizedImageSrc });
            };

            resizedImage.src = resizedImageSrc;
        });
    }

    const onCropClick = () => {
        const canvas = document.createElement("canvas");
        canvas.width = rectWidth;
        canvas.height = rectHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            originalImage,
            rectCurrentPosition.x,
            rectCurrentPosition.y,
            rectWidth,
            rectHeight,
            0,
            0,
            rectWidth,
            rectHeight
        );

        canvas.toBlob((blob) => {
            const file = new File([blob], props.img.name, { type: props.img.type });
            props.onImgCropped(file);
        });

        setCroppedImageSrc(canvas.toDataURL());
    }

    const onCropAnotherClick = () => {
        setCroppedImageSrc(undefined);
    }

    const onCanvasMouseDown = (e: any) => {
        const positionInsideCanvas = getMousePositionInsideCanvas(e);

        if (isInsideResizeButton(positionInsideCanvas)) {
            isResizing = true;
        }
        else if (isInsideRect(positionInsideCanvas)) {
            isDragging = true;
            if (!initialMousePositionInRect.x && !initialMousePositionInRect.y) {
                initialMousePositionInRect.x = positionInsideCanvas.x - rectCurrentPosition.x;
                initialMousePositionInRect.y = positionInsideCanvas.y - rectCurrentPosition.y;
            }
        }
    }

    const onCanvasMouseUp = () => {
        isDragging = false;
        isResizing = false;
        initialMousePositionInRect.x = undefined;
        initialMousePositionInRect.y = undefined;
    }

    const onCanvasMouseMove = (e: any) => {
        if (isDragging) {
            const positionInsideCanvas = getMousePositionInsideCanvas(e);

            rectCurrentPosition.x = positionInsideCanvas.x - initialMousePositionInRect.x;
            rectCurrentPosition.y = positionInsideCanvas.y - initialMousePositionInRect.y;

            ensureRectInsideCanvas();
            window.requestAnimationFrame(draw);
        } else if (isResizing) {
            const bottomRight = getMousePositionInsideCanvas(e);

            let newWidth = bottomRight.x - rectCurrentPosition.x;
            let newHeight = bottomRight.y - rectCurrentPosition.y;

            if (props.cropType === "square") {
                newWidth = newHeight;
            }

            let isNeedToDraw = false;

            if (newWidth >= props.minWidth) {
                rectWidth = newWidth;
                isNeedToDraw = true;
            }

            if (newHeight >= props.minHeight) {
                rectHeight = newHeight;
                isNeedToDraw = true;
            }

            if (isNeedToDraw) {
                ensureRectInsideCanvas();
                window.requestAnimationFrame(draw);
            }
        }
    }

    const onCanvasMouseLeave = () => {
        onCanvasMouseUp();
    }

    const draw = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

        ctx.lineWidth = 3;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.arc(rectCurrentPosition.x + rectWidth, rectCurrentPosition.y + rectHeight, resizeButtonRadius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.setLineDash([5, 5]);
        ctx.strokeRect(rectCurrentPosition.x, rectCurrentPosition.y, rectWidth, rectHeight);
    }

    const ensureRectInsideCanvas = () => {
        const leftSideX = rectCurrentPosition.x;
        if (leftSideX < 0) {
            rectCurrentPosition.x = 0;
        }

        const topSideY = rectCurrentPosition.y;
        if (topSideY < 0) {
            rectCurrentPosition.y = 0;
        }

        const rightSideX = rectCurrentPosition.x + rectWidth;
        if (rightSideX > canvasWidth) {
            rectCurrentPosition.x -= rightSideX - canvasWidth;
        }

        const bottomSideY = rectCurrentPosition.y + rectHeight;
        if (bottomSideY > canvasHeight) {
            rectCurrentPosition.y -= bottomSideY - canvasHeight;
        }
    }

    const isInsideRect = (point: Point) => {
        return point.x > rectCurrentPosition.x && point.x < rectCurrentPosition.x + rectWidth
            && point.y > rectCurrentPosition.y && point.y < rectCurrentPosition.y + rectHeight;
    }

    const isInsideResizeButton = (point: Point) => {
        // pythagorean theorem
        const xSquared = Math.pow((rectCurrentPosition.x + rectWidth) - point.x, 2);
        const ySquared = Math.pow((rectCurrentPosition.y + rectHeight) - point.y, 2);
        return Math.sqrt(xSquared + ySquared) < resizeButtonRadius;
    }

    const getMousePositionInsideCanvas = (event: any): Point => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    const renderCroppedImageMenu = () => {
        return (
            <div>
                <img src={croppedImageSrc}></img>
                <button type="button" onClick={onCropAnotherClick}>Crop Another Area</button>
            </div>
        );
    }

    const renderCroppingMenu = () => {
        return (
            <div>
                <canvas
                    onMouseDown={onCanvasMouseDown}
                    onMouseUp={onCanvasMouseUp}
                    onMouseMove={onCanvasMouseMove}
                    onMouseLeave={onCanvasMouseLeave}
                    ref={canvasRef}
                ></canvas>
                <button type="button" onClick={onCropClick}>Crop</button>
            </div>
        );
    }

    return (
        <div className={css.imgCropper}>
            {
                croppedImageSrc ? renderCroppedImageMenu() : renderCroppingMenu()
            }
        </div>
    );
}

export default ImgCropper;