export interface GoodDeed {
    id: number;  // Изменено с string на number
    title: string;
    description: string;
    userId: number;  // Также изменим это на number, если оно ещё не number
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}
