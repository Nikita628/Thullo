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