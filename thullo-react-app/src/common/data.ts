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
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
}