import React from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './Media.module.css';

interface MediaProps extends BaseProps {
    imgSource?: string;
    imgPlaceholder?: string;
    imgWidth: string;
    imgHeight: string;
    header: string;
    text?: string;
}

const Media = (props: MediaProps) => {
    return (
        <div style={{ ...props.style }} className={concatCssClasses(css.media, props.className)} key={props.key}>
            <div>
                {
                    props.imgSource
                        ? <img
                            style={{ width: props.imgWidth, height: props.imgHeight }}
                            className={css.img}
                            src={props.imgSource}
                            alt=""
                        />
                        : <div
                            className={css.imgPlaceholder}
                            style={{ width: props.imgWidth, height: props.imgHeight }}
                        >
                            {props.imgPlaceholder || ""}
                        </div>
                }
                <div className={css.info}>
                    <h6>{props.header}</h6>
                    {props.text && <p>{props.text}</p>}
                </div>
            </div>
        </div>
    );
}

export default Media;