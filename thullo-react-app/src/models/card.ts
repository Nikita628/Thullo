import { User } from "./user";

export class Card {
    id: number;
    coverUrl: string;
    title: string;
    description: string;
    users: User[] = [];
    labels: CardLabel[] = [];
}

export class CardLabel {
    id: number;
    name: string;
    color: string;
    boardId: number;
}