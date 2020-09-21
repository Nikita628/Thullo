import { NotificationType, SortDirection } from "../common/data";

export class File {
    id: number;
    name: string;
    url: string;
}

export class Notification {
    type: NotificationType;
    message: string;
}

export class BaseApiResponse {
    errors: string[] = [];
}

export class ApiResponse<ItemType> extends BaseApiResponse {
    item: ItemType;
}

export class ApiPageResponse<ItemsType> extends BaseApiResponse {
    items: ItemsType[] = [];
    totalCount: number = 0;
}

export class ApiPageRequest {
    pageNumber: number = 1;
    pageSize: number = 10;
    sortProp: string = "id";
    sortDirection: SortDirection = SortDirection.asc;
}