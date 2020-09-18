export type Action<T = any> = (param?: T) => void;

export const constants = {
    localStorageTokenKey: "thullo_token",
    localStorageUserKey: "thullo_user"
};