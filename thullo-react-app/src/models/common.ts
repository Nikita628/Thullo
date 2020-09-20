export class File {
    id: number;
    name: string;
    url: string;
}

export class Notification {
    type: "error" | "success" | "warning";
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
    totalCount: number;
}