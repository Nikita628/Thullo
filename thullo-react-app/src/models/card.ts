import { File } from "./common";
import { User } from "./user";

export class Card {
    id: number;
    coverUrl: string;
    title: string;
    description: string;
    boardListId: number;
    users: User[] = [];
    labels: CardLabel[] = [];
    attachments: CardAttachment[] = [];
    comments: CardComment[] = [];
}

export class CardLabel {
    id: number;
    name: string;
    color: string;
    boardId: number;
}

export class CardAttachment {
    id: number;
    file: File;
    cardId: number;
    createdDate: Date;
    createdBy: User;
}

export class CardComment {
    id: number;
    text: string;
    cardId: number;
    createdBy: User;
    createdDate: Date;
}