import React, { ReactNode, useRef, useState } from 'react';
import axios from "axios";

import Icon from '../Icon/Icon';
import css from './FilePicker.module.css';
import { actionCreators as commonActionCreators } from "../../../../state/common";
import { NotificationType } from '../../../../common/data';

interface FilePickerProps {
    isUploadEnabled: boolean;
    fileUploadUrl?: string;
    maxNumberOfFiles?: number;
    onSelectedFilesChanged?: (file: File[]) => void;
}

class FilePreview {
    file: File;
    isImage: boolean;
    imgSrc: string | ArrayBuffer;
}

const FilePicker = (props: FilePickerProps) => {
    const [isFileFormHighlited, setIsFileFormHighlited] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [filePriviews, setFilePreviews] = useState<FilePreview[]>([]);
    const fileInputElement = useRef<HTMLInputElement>();

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    }

    const onFileFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
        fileInputElement.current.click();
    }

    const onFileFormDragEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFileFormHighlited(true);
    }

    const onFileFormDragLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFileFormHighlited(false);
    }

    const onFileFormDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFileFormHighlited(false);
        const dataTransfer = e.dataTransfer;
        handleFiles(dataTransfer.files);
    }

    const onFileFormDragOver = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFileFormHighlited(true);
    }

    const onUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (props.fileUploadUrl) {
            let formData = new FormData();

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("file" + i, selectedFiles[i]);
            }

            axios.post(props.fileUploadUrl, formData)
                .then(() => setSelectedFiles([]))
                .catch((errors: string[]) => commonActionCreators.CreateNotificationsRequested(errors, NotificationType.error));
        }
    }

    const preventDefault = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleFiles = (files: FileList) => {
        const maxNumberOfFiles = props.maxNumberOfFiles ? props.maxNumberOfFiles : 100;
        const newFiles: File[] = [...selectedFiles];

        for (let i = 0; i < files.length && newFiles.length < maxNumberOfFiles; i++) {
            if (!newFiles.some(f => areEqual(f, files.item(i)))) {
                newFiles.push(files.item(i));
            }
        }

        initializeFilePreviews(newFiles);

        setSelectedFiles(newFiles);

        if (props.onSelectedFilesChanged) {
            props.onSelectedFilesChanged(newFiles);
        }
    }

    const deleteFile = (file: File) => {
        const newFiles = selectedFiles.filter(f => f !== file);
        const newFilePreviews = filePriviews.filter(fp => fp.file !== file);
        setSelectedFiles(newFiles);
        setFilePreviews(newFilePreviews);

        if (props.onSelectedFilesChanged) {
            props.onSelectedFilesChanged(newFiles);
        }
    }

    const areEqual = (fileA: File, fileB: File) => {
        return fileA.name === fileB.name
            && fileA.size === fileB.size
            && fileA.type === fileB.type;
    }

    const filePreviewsContainsFile = (file: File) => {
        return filePriviews.some(fp => fp.file.name === file.name
            && fp.file.size === file.size
            && fp.file.type === file.type);
    }

    const initializeFilePreviews = (files: File[]) => {
        for (let i = 0; i < files.length; i++) {
            if (filePreviewsContainsFile(files[i])) continue;
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                const filePreview = new FilePreview();
                filePreview.file = files[i];

                if (files[i].type.includes("image")) {
                    filePreview.isImage = true;
                    filePreview.imgSrc = reader.result;
                    setFilePreviews((prevState) => {
                        return [...prevState, filePreview];
                    });
                } else {
                    filePreview.isImage = false;
                    const newFilePreviews = [...filePriviews];
                    newFilePreviews.push(filePreview);
                    setFilePreviews((prevState) => {
                        return [...prevState, filePreview];
                    });
                }
            };
        }
    }

    const renderFilePreviews = () => {
        return (
            <div className={css.filePreviews}>
                {
                    filePriviews.map((f, i) => {
                        return (
                            <div key={i} className={css.filePreview} onClick={preventDefault}>
                                <div className={css.filePreviewImgContainer}>
                                    {renderFilePreviewImg(f)}
                                </div>
                                <div className={css.deleteFileButton} onClick={(e) => deleteFile(f.file)}>
                                    <Icon type="x-square" size={25} className={css.deleteFileIcon} />
                                </div>
                                <div className={css.filePreviewName}>
                                    <span className={css.filePreviewNameText} onClick={preventDefault}>{f.file.name}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    const renderFilePreviewImg = (filePreview: FilePreview): ReactNode => {
        if (filePreview.isImage) {
            return <img src={filePreview.imgSrc as string} className={css.filePreviewImg}></img>
        } else {
            return <div className={css.filePreviewImgPlaceholder}></div>
        }
    }

    let fileFormClassName = css.fileForm;

    if (isFileFormHighlited) {
        fileFormClassName += " " + css.fileFormHighlited;
    }

    let uploadButtonClassName = css.uploadButton;

    if (!filePriviews.length) {
        uploadButtonClassName += " " + css.uploadButtonDisabled;
    }

    return (
        <div
            className={fileFormClassName}
            onClick={onFileFormClick}
            onDragEnter={onFileFormDragEnter}
            onDragLeave={onFileFormDragLeave}
            onDrop={onFileFormDrop}
            onDragOver={onFileFormDragOver}
        >
            <input ref={fileInputElement} type="file" id={css.fileInput} onChange={onFileInputChange} />
            {
                filePriviews.length
                    ? renderFilePreviews()
                    : <p className={css.filePickerMessage}>Drop files here or click to select.</p>
            }
            {
                props.isUploadEnabled
                && <button className={uploadButtonClassName} onClick={onUploadClick} type="button">Upload Selected Files</button>
            }
        </div>
    );
}

export default FilePicker;