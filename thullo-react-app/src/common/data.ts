import { CSSProperties, ReactNode } from "react";

export type IActionFunction<T = any> = (param?: T) => void;

export const constants = {
    localStorageTokenKey: "thullo_token",
    localStorageUserKey: "thullo_user"
};

export enum NotificationType {
    "success" = "Success",
    "error" = "Error",
    "warning" = "Warning"
}

export enum SortDirection {
    "asc" = "asc",
    "desc" = "desc"
}

export enum BoardVisibility {
    private = "Private",
    public = "Public",
}

export interface BaseProps {
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const cardLabelColorsMap: { [key: string]: string } = {
    // backgroundColor: textColor
    "#219653": "white",
    "#f2c94c": "black",
    "#f2994a": "white",
    "#eb5757": "white",
    "#2f80ed": "white",
    "#56ccf2": "black",
    "#6fcf97": "black",
    "#333333": "white",
    "#4f4f4f": "white",
    "#828282": "white",
    "#bdbdbd": "black",
    "#e0e0e0": "black",
}