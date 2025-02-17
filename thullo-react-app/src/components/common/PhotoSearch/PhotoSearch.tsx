import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from "../../../state/common";
import { BaseProps } from '../../../common/data';
import css from './PhotoSearch.module.css';
import { AppState } from '../../../state';
import { PexelsPhoto, PexelsSearchParam } from '../../../models/common';
import InputGroup from '../ui/InputGroup/InputGroup';
import InputGroupButton from '../ui/InputGroup/InputGroupButton/InputGroupButton';
import Icon from '../ui/Icon/Icon';
import InputGroupInput from '../ui/InputGroup/InputGroupInput/InputGroupInput';
import { concatCssClasses } from '../../../common/functionality';

interface PhotoSearchProps extends BaseProps {
    onPhotoSelected: (photo: PexelsPhoto) => void;
}

const PhotoSearch = (props: PhotoSearchProps) => {
    const dispatch = useDispatch();
    const pexelsPage = useSelector((state: AppState) => state.common.pexelsPhotosPage);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const param = new PexelsSearchParam();
        dispatch(actionCreators.SearchPexelsRequested(param));
    }, [])

    const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const searchPhotos = () => {
        if (searchQuery) {
            const param = new PexelsSearchParam();
            param.query = searchQuery;
            dispatch(actionCreators.SearchPexelsRequested(param));
        }
    }

    const photosToRender: React.ReactNode[] = [];

    if (pexelsPage) {
        pexelsPage.items.forEach((p: PexelsPhoto) => {
            photosToRender.push(
                <img alt="" key={p.id} onClick={() => props.onPhotoSelected(p)} className={css.photo} src={p.src.tiny} />
            );
        });
    } 

    return (
        <div className={concatCssClasses(css.photoSearch, props.className)}>
            <h5>Photo Search</h5>
            <p>Search Pexels for photos</p>

            <InputGroup className={css.searchInputGroup}>
                <InputGroupInput className={css.searchInput} onChange={changeSearchQuery} />
                <InputGroupButton className={css.searchButton} onClick={searchPhotos}><Icon type="search" /></InputGroupButton>
            </InputGroup>

            <div className={css.photos}>
                {
                    photosToRender.length
                        ? photosToRender
                        : <div className={css.spinner}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default PhotoSearch;