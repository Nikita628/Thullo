import React, { useCallback, useEffect, useRef } from 'react';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './Dropdown.module.css';

interface DropdownProps extends BaseProps {
    onClickOutside?: () => void;
}

const Dropdown = (props: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>();

    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        }
    }, [])

    const handleMouseDown = useCallback((e: MouseEvent) => {
        if (!dropdownRef.current.contains(e.target as Element) && props.onClickOutside) {
            props.onClickOutside();
        }
    }, [])

    return (
        <div
            ref={dropdownRef}
            className={concatCssClasses(css.dropdown, props.className)}
            style={{ ...props.style }}
        >
            {props.children}
        </div>
    );
}

export default Dropdown;