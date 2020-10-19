import React, { useState } from 'react';

import css from './CardLabelSearch.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps, cardLabelColorsMap } from '../../../common/data';
import { CardLabel as CardLabelModel } from '../../../models/card';
import Input from '../../common/ui/Input/Input';
import IconBadge from '../../common/ui/IconBadge/IconBadge';
import Button from '../../common/ui/Button/Button';
import CardLabel from '../CardLabel/CardLabel';

interface CardLabelSearchProps extends BaseProps {
    onAddLabel: (label: CardLabelModel) => void;
    attachedLabels: CardLabelModel[];
}

const CardLabelSearch = (props: CardLabelSearchProps) => {
    const [selectedLabel, setSelectedLabel] = useState<string>();
    const [labelName, setLabelName] = useState("");

    const addLabelOnCard = () => {
        // create label
        // props.onAddLabel(label);
    }

    return (
        <div
            style={{ ...props.style }}
            className={concatCssClasses(css.cardLabelSearch, props.className)}
        >
            <h5>Label</h5>
            <p>Select name and a color</p>

            <Input
                onChange={(e) => setLabelName(e.target.value)}
                style={{ margin: "10px 0", width: "100%" }}
                placeHolder="Label..."
                type="text"
            />

            <div className={css.colorsGrid}>
                {
                    Object.keys(cardLabelColorsMap).map((key: string, i: number) =>
                        <div
                            key={i}
                            className={css.labelColor}
                            style={{ backgroundColor: key, color: cardLabelColorsMap[key] }}
                            onClick={() => setSelectedLabel(key)}
                        >
                            {selectedLabel === key && "label"}
                        </div>
                    )
                }
            </div>

            <IconBadge style={{ margin: "15px 0 5px 0" }} icon="list-ul" text="Attached labels" />

            <div className={css.availableLabels}>
                {
                    props.attachedLabels.map(cl => <CardLabel key={cl.id} cardlabel={cl} />)
                }
            </div>

            <div className={css.buttonContainer}>
                <Button onClick={addLabelOnCard} type="primary">Add</Button>
            </div>
        </div>
    );
}

export default CardLabelSearch;