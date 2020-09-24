import { BoardList } from "./boardList";
import { ApiPageRequest } from "./common";
import { User } from "./user";

export class Board {
    id: number;
    title: string;
    coverUrl: string;
    isPrivate: boolean;
    description: string;
    users: User[];
    boardLists: BoardList[];
}

export class BoardSearchParam extends ApiPageRequest {
    titleContains: string;
}