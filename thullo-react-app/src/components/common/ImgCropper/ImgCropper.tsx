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

interface Dimensions {
    width: number;
    height: number;
}

const defaultResizerButtonRadius = 8;
const defaultImageWidth = 400;
const defaultImageHeight = 300;
const defaultCropperColor = "#c4c4c4";
const defaultLineWidth = 2;

let originalImage: HTMLImageElement;
let isDragging = false;
let isResizing = false;

let initialMousePositionInCropperRect: Point = {
    x: 0,
    y: 0
};

let cropperRectanglePosition: Point = {
    x: 0,
    y: 0
};

let cropperRectangleDimensions: Dimensions = {
    width: 0,
    height: 0
};

let canvasDimensions: Dimensions = {
    width: 0,
    height: 0
}

const ImgCropper = (props: ImgCropperProps) => {
    if (props.cropType === "square" && props.minHeight !== props.minWidth) {
        throw Error("For the square crop the minHeight and minWidth must be the same");
    }

    if (!props.img.type.includes("image")) {
        throw Error("Only images can be cropped");
    }

    cropperRectangleDimensions.width = props.minWidth;
    cropperRectangleDimensions.height = props.minHeight;

    //const [originalImageSrc, setOriginalImageSrc] = useState<string>();
    const [croppedImageSrc, setCroppedImageSrc] = useState<string>();
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(props.img);
        reader.onloadend = () => {
            const imgSrc = reader.result as string;
            const inputImage = new Image();

            inputImage.onload = () => {
                scaleImage(inputImage, defaultImageWidth, defaultImageHeight)
                    .then((img: { scaledImg: HTMLImageElement, scaledImgSrc: string }) => {
                        originalImage = img.scaledImg;
                        canvasDimensions.width = img.scaledImg.naturalWidth;
                        canvasDimensions.height = img.scaledImg.naturalHeight;
                        canvasRef.current.width = img.scaledImg.naturalWidth;
                        canvasRef.current.height = img.scaledImg.naturalHeight;

                        draw(canvasRef.current);
                        //setOriginalImageSrc(img.scaledImgSrc);
                    });
            };

            inputImage.src = imgSrc;
        };
        return () => {
            originalImage = undefined;
        };
    }, [props.img]);

    useEffect(() => {
        if (!croppedImageSrc && originalImage && canvasRef.current) {
            canvasRef.current.width = originalImage.naturalWidth;
            canvasRef.current.height = originalImage.naturalHeight;
            draw(canvasRef.current);
        }
    }, [croppedImageSrc]);

    const onCropClick = () => {
        cropImage(
            props.img,
            originalImage,
            cropperRectanglePosition,
            cropperRectangleDimensions.width,
            cropperRectangleDimensions.height
        ).then((croppedImg) => {
            props.onImgCropped(croppedImg.file);
            setCroppedImageSrc(croppedImg.src);
        });
    }

    const onCropAnotherClick = () => {
        cropperRectanglePosition = { x: 0, y: 0 };
        setCroppedImageSrc(undefined);
    }

    const onCanvasMouseDown = (e: any) => {
        const positionInsideCanvas = getMousePositionInsideCanvas(e, canvasRef.current);

        if (isInsideResizerButton(positionInsideCanvas)) {
            isResizing = true;
        }
        else if (isInsideCropperRect(positionInsideCanvas)) {
            isDragging = true;
            if (!initialMousePositionInCropperRect.x && !initialMousePositionInCropperRect.y) {
                initialMousePositionInCropperRect.x = positionInsideCanvas.x - cropperRectanglePosition.x;
                initialMousePositionInCropperRect.y = positionInsideCanvas.y - cropperRectanglePosition.y;
            }
        }
    }

    const onCanvasMouseUp = () => {
        isDragging = false;
        isResizing = false;
        initialMousePositionInCropperRect.x = 0;
        initialMousePositionInCropperRect.y = 0;
    }

    const onCanvasMouseMove = (e: any) => {
        if (isDragging) {
            const positionInsideCanvas = getMousePositionInsideCanvas(e, canvasRef.current);

            cropperRectanglePosition.x = positionInsideCanvas.x - initialMousePositionInCropperRect.x;
            cropperRectanglePosition.y = positionInsideCanvas.y - initialMousePositionInCropperRect.y;

            ensureCropperRectInsideCanvas();
            window.requestAnimationFrame(() => draw(canvasRef.current));
        } else if (isResizing) {
            const bottomRight = getMousePositionInsideCanvas(e, canvasRef.current);

            let newWidth = bottomRight.x - cropperRectanglePosition.x;
            let newHeight = bottomRight.y - cropperRectanglePosition.y;

            if (props.cropType === "square") {
                newWidth = newHeight;
            }

            let isNeedToDraw = false;

            if (newWidth >= props.minWidth) {
                cropperRectangleDimensions.width = newWidth;
                isNeedToDraw = true;
            }

            if (newHeight >= props.minHeight) {
                cropperRectangleDimensions.height = newHeight;
                isNeedToDraw = true;
            }

            if (isNeedToDraw) {
                ensureCropperRectInsideCanvas();
                window.requestAnimationFrame(() => draw(canvasRef.current));
            }
        }
    }

    const onCanvasMouseLeave = () => {
        onCanvasMouseUp();
    }

    const renderCroppedImageMenu = () => {
        return (
            <div className={css.croppedImgMenu}>
                <img src={croppedImageSrc}></img>
                <button className={css.button} type="button" onClick={onCropAnotherClick}>Select Another Area</button>
            </div>
        );
    }

    const renderCropperMenu = () => {
        return (
            <div className={css.cropperMenu}>
                <canvas
                    onMouseDown={onCanvasMouseDown}
                    onMouseUp={onCanvasMouseUp}
                    onMouseMove={onCanvasMouseMove}
                    onMouseLeave={onCanvasMouseLeave}
                    ref={canvasRef}
                ></canvas>
                <button className={css.button} type="button" onClick={onCropClick}>Crop Selection</button>
            </div>
        );
    }

    return (
        <div className={css.imgCropper}>
            {
                croppedImageSrc ? renderCroppedImageMenu() : renderCropperMenu()
            }
        </div>
    );
}

const draw = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, canvasDimensions.width, canvasDimensions.height);

    ctx.lineWidth = defaultLineWidth;
    ctx.fillStyle = defaultCropperColor;
    ctx.strokeStyle = defaultCropperColor;

    ctx.beginPath();
    ctx.arc(cropperRectanglePosition.x + cropperRectangleDimensions.width, cropperRectanglePosition.y + cropperRectangleDimensions.height, defaultResizerButtonRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.setLineDash([5, 5]);
    ctx.strokeRect(cropperRectanglePosition.x, cropperRectanglePosition.y, cropperRectangleDimensions.width, cropperRectangleDimensions.height);
}

const isInsideCropperRect = (point: Point) => {
    return point.x > cropperRectanglePosition.x && point.x < cropperRectanglePosition.x + cropperRectangleDimensions.width
        && point.y > cropperRectanglePosition.y && point.y < cropperRectanglePosition.y + cropperRectangleDimensions.height;
}

const isInsideResizerButton = (point: Point) => {
    // pythagorean theorem
    const xSquared = Math.pow((cropperRectanglePosition.x + cropperRectangleDimensions.width) - point.x, 2);
    const ySquared = Math.pow((cropperRectanglePosition.y + cropperRectangleDimensions.height) - point.y, 2);
    return Math.sqrt(xSquared + ySquared) < defaultResizerButtonRadius;
}

const ensureCropperRectInsideCanvas = () => {
    const leftSideX = cropperRectanglePosition.x;
    if (leftSideX < 0) {
        cropperRectanglePosition.x = 0;
    }

    const topSideY = cropperRectanglePosition.y;
    if (topSideY < 0) {
        cropperRectanglePosition.y = 0;
    }

    const rightSideX = cropperRectanglePosition.x + cropperRectangleDimensions.width;
    if (rightSideX > canvasDimensions.width) {
        cropperRectanglePosition.x -= rightSideX - canvasDimensions.width;
    }

    const bottomSideY = cropperRectanglePosition.y + cropperRectangleDimensions.height;
    if (bottomSideY > canvasDimensions.height) {
        cropperRectanglePosition.y -= bottomSideY - canvasDimensions.height;
    }
}

const scaleImage = (img: HTMLImageElement, maxWidth: number, maxHeight: number) => {
    return new Promise((resolve: (scaledImg: { scaledImg: HTMLImageElement, scaledImgSrc: string }) => void) => {
        let widthAfterScaling = img.width;
        let heightAfterScaling = img.height;

        if (img.width >= img.height) {
            const scaleFactor = img.width / maxWidth;
            widthAfterScaling /= scaleFactor;
            heightAfterScaling /= scaleFactor;
        } else if (img.height >= img.width) {
            const scaleFactor = img.height / maxHeight;
            widthAfterScaling /= scaleFactor;
            heightAfterScaling /= scaleFactor;
        }

        const canvas = document.createElement("canvas");
        canvas.width = widthAfterScaling;
        canvas.height = heightAfterScaling;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            0,
            0,
            widthAfterScaling,
            heightAfterScaling
        );

        const resizedImage = new Image();
        const resizedImageSrc = canvas.toDataURL();

        resizedImage.onload = () => {
            resolve({ scaledImg: resizedImage, scaledImgSrc: resizedImageSrc });
        };

        resizedImage.src = resizedImageSrc;
    });
}

const cropImage = (imgFile: File, img: HTMLImageElement, cropStart: Point, cropWidth: number, cropHeight: number) => {
    return new Promise((resolve: (croppedImg: { file: File, src: string }) => void, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            cropStart.x,
            cropStart.y,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
        );

        canvas.toBlob((blob) => {
            const file = new File([blob], imgFile.name, { type: imgFile.type });
            const source = canvas.toDataURL();
            resolve({ file, src: source });
        });
    });
}

const getMousePositionInsideCanvas = (event: any, canvas: HTMLCanvasElement): Point => {
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top
    };
}

export default ImgCropper;