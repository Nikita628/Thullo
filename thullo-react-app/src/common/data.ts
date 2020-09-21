export type IActionFunction<T = any> = (param?: T) => void;

export const constants = {
    localStorageTokenKey: "thullo_token",
    localStorageUserKey: "thullo_user"
};

export enum NotificationType {
    "success",
    "error",
    "warning"
}

export enum SortDirection {
    "asc",
    "desc"
}