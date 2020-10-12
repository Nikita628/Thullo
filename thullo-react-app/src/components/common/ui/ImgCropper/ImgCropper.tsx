import React, { useState, useEffect, useRef } from 'react';

import { concatCssClasses } from '../../../../common/functionality';
import css from './ImgCropper.module.css';

interface ImgCropperProps {
    img: File;
    cropType: "square" | "free";
    minWidth: number;
    minHeight: number;
    isInvalid?: boolean;
    className?: string;
    style?: Record<string, string>;
    onCroppedImgChanged: (croppedImg: File) => void;
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Dimensions {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

const defaultResizerButtonRadius = 8;
const defaultImageWidth = 400;
const defaultImageHeight = 300;
const defaultCropperColor = "#c4c4c4";
const defaultLineWidth = 2;

const ImgCropper = (props: ImgCropperProps) => {
    const _originalImage = useRef<HTMLImageElement>();
    const _isDragging = useRef(false);
    const _isResizing = useRef(false);
    const _initialMousePositionInCropperRect = useRef(new Point(0, 0));
    const _cropperRectanglePosition = useRef(new Point(0, 0));
    const _cropperRectangleDimensions = useRef(new Dimensions(0, 0));
    const _canvasDimensions = useRef(new Dimensions(0, 0));

    const [croppedImageSrc, setCroppedImageSrc] = useState<string>();
    const canvasRef = useRef<HTMLCanvasElement>();

    _cropperRectangleDimensions.current.width = props.minWidth;
    _cropperRectangleDimensions.current.height = props.minHeight;

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(props.img);
        reader.onloadend = () => {
            const imgSrc = reader.result as string;
            const inputImage = new Image();

            inputImage.onload = () => {
                scaleImage(inputImage, defaultImageWidth, defaultImageHeight)
                    .then((img: { scaledImg: HTMLImageElement, scaledImgSrc: string }) => {
                        _originalImage.current = img.scaledImg;
                        _cropperRectanglePosition.current = { x: 0, y: 0 };
                        _canvasDimensions.current.width = img.scaledImg.naturalWidth;
                        _canvasDimensions.current.height = img.scaledImg.naturalHeight;
                        canvasRef.current.width = img.scaledImg.naturalWidth;
                        canvasRef.current.height = img.scaledImg.naturalHeight;

                        draw(
                            canvasRef.current,
                            _originalImage.current,
                            _canvasDimensions.current,
                            _cropperRectanglePosition.current,
                            _cropperRectangleDimensions.current
                        );
                    });
            };

            inputImage.src = imgSrc;
        };
    }, [props.img]);

    useEffect(() => {
        if (!croppedImageSrc && _originalImage.current && canvasRef.current) {
            _cropperRectanglePosition.current = { x: 0, y: 0 };
            canvasRef.current.width = _originalImage.current.naturalWidth;
            canvasRef.current.height = _originalImage.current.naturalHeight;
            draw(
                canvasRef.current,
                _originalImage.current,
                _canvasDimensions.current,
                _cropperRectanglePosition.current,
                _cropperRectangleDimensions.current
            );
        }
    }, [croppedImageSrc]);

    const handleCropClick = () => {
        cropImage(
            props.img,
            _originalImage.current,
            _cropperRectanglePosition.current,
            _cropperRectangleDimensions.current.width,
            _cropperRectangleDimensions.current.height
        ).then((croppedImg) => {
            props.onCroppedImgChanged(croppedImg.file);
            setCroppedImageSrc(croppedImg.src);
        });
    }

    const handleCropAnotherAreaClick = () => {
        _cropperRectanglePosition.current = { x: 0, y: 0 };
        props.onCroppedImgChanged(undefined);
        setCroppedImageSrc(undefined);
    }

    const handleCanvasClick = (e: any) => {
        const positionInsideCanvas = getMousePositionInsideCanvas(e, canvasRef.current);

        if (isInsideResizerButton(positionInsideCanvas, _cropperRectanglePosition.current, _cropperRectangleDimensions.current)) {
            _isResizing.current = true;
        }
        else if (isInsideCropperRect(positionInsideCanvas, _cropperRectanglePosition.current, _cropperRectangleDimensions.current)) {
            _isDragging.current = true;
            if (!_initialMousePositionInCropperRect.current.x && !_initialMousePositionInCropperRect.current.y) {
                _initialMousePositionInCropperRect.current.x = positionInsideCanvas.x - _cropperRectanglePosition.current.x;
                _initialMousePositionInCropperRect.current.y = positionInsideCanvas.y - _cropperRectanglePosition.current.y;
            }
        }
    }

    const handleCanvasLeave = () => {
        _isDragging.current = false;
        _isResizing.current = false;
        _initialMousePositionInCropperRect.current.x = 0;
        _initialMousePositionInCropperRect.current.y = 0;
    }

    const handleMovementInsideCanvas = (e: any) => {
        if (_isDragging.current) {
            const positionInsideCanvas = getMousePositionInsideCanvas(e, canvasRef.current);

            _cropperRectanglePosition.current.x = positionInsideCanvas.x - _initialMousePositionInCropperRect.current.x;
            _cropperRectanglePosition.current.y = positionInsideCanvas.y - _initialMousePositionInCropperRect.current.y;

            ensureCropperRectInsideCanvas(
                _cropperRectanglePosition.current,
                _cropperRectangleDimensions.current,
                _canvasDimensions.current
            );

            window.requestAnimationFrame(() => draw(
                canvasRef.current,
                _originalImage.current,
                _canvasDimensions.current,
                _cropperRectanglePosition.current,
                _cropperRectangleDimensions.current
            ));
        } else if (_isResizing.current) {
            const bottomRight = getMousePositionInsideCanvas(e, canvasRef.current);

            let newWidth = bottomRight.x - _cropperRectanglePosition.current.x;
            let newHeight = bottomRight.y - _cropperRectanglePosition.current.y;

            if (props.cropType === "square") {
                newWidth = newHeight;
            }

            let isNeedToDraw = false;

            if (newWidth >= props.minWidth) {
                _cropperRectangleDimensions.current.width = newWidth;
                isNeedToDraw = true;
            }

            if (newHeight >= props.minHeight) {
                _cropperRectangleDimensions.current.height = newHeight;
                isNeedToDraw = true;
            }

            if (isNeedToDraw) {
                ensureCropperRectInsideCanvas(
                    _cropperRectanglePosition.current,
                    _cropperRectangleDimensions.current,
                    _canvasDimensions.current
                );

                window.requestAnimationFrame(() => draw(
                    canvasRef.current,
                    _originalImage.current,
                    _canvasDimensions.current,
                    _cropperRectanglePosition.current,
                    _cropperRectangleDimensions.current
                ));
            }
        }
    }

    const renderCroppedImageMenu = () => {
        return (
            <div className={css.croppedImgMenu}>
                <div className={css.scroll}>
                    <img alt="" src={croppedImageSrc}></img>
                </div>
                <button className={css.button} type="button" onClick={handleCropAnotherAreaClick}>Select Another Area</button>
            </div>
        );
    }

    const renderCropperMenu = () => {
        return (
            <div className={css.cropperMenu}>
                <div className={css.scroll}>
                    <canvas
                        onMouseDown={handleCanvasClick}
                        onMouseUp={handleCanvasLeave}
                        onMouseMove={handleMovementInsideCanvas}
                        onMouseLeave={handleCanvasLeave}
                        ref={canvasRef}
                    ></canvas>
                </div>
                <button className={css.button} type="button" onClick={handleCropClick}>Crop Selection</button>
            </div>
        );
    }

    return (
        <div
            className={concatCssClasses(css.imgCropper, props.className, props.isInvalid ? css.invalid : "")}
            style={{ ...props.style }}>
            {
                croppedImageSrc ? renderCroppedImageMenu() : renderCropperMenu()
            }
        </div>
    );
}

const draw = (
    canvas: HTMLCanvasElement,
    originalImage: HTMLImageElement,
    canvasDimensions: Dimensions,
    cropperRectanglePosition: Point,
    cropperRectangleDimensions: Dimensions
) => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, canvasDimensions.width, canvasDimensions.height);

    ctx.lineWidth = defaultLineWidth;
    ctx.fillStyle = defaultCropperColor;
    ctx.strokeStyle = defaultCropperColor;

    ctx.beginPath();
    ctx.arc(
        cropperRectanglePosition.x + cropperRectangleDimensions.width,
        cropperRectanglePosition.y + cropperRectangleDimensions.height,
        defaultResizerButtonRadius, 0, 2 * Math.PI
    );
    ctx.fill();

    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
        cropperRectanglePosition.x,
        cropperRectanglePosition.y,
        cropperRectangleDimensions.width,
        cropperRectangleDimensions.height
    );
}

const isInsideCropperRect = (point: Point, cropperRectanglePosition: Point, cropperRectangleDimensions: Dimensions) => {
    return point.x > cropperRectanglePosition.x && point.x < cropperRectanglePosition.x + cropperRectangleDimensions.width
        && point.y > cropperRectanglePosition.y && point.y < cropperRectanglePosition.y + cropperRectangleDimensions.height;
}

const isInsideResizerButton = (point: Point, cropperRectanglePosition: Point, cropperRectangleDimensions: Dimensions) => {
    // pythagorean theorem
    const xSquared = Math.pow((cropperRectanglePosition.x + cropperRectangleDimensions.width) - point.x, 2);
    const ySquared = Math.pow((cropperRectanglePosition.y + cropperRectangleDimensions.height) - point.y, 2);
    return Math.sqrt(xSquared + ySquared) < defaultResizerButtonRadius;
}

const ensureCropperRectInsideCanvas = (cropperRectanglePosition: Point, cropperRectangleDimensions: Dimensions, canvasDimensions: Dimensions) => {
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