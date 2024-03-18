// Note.ts
export interface Note {
    id: number | string;
    title: string;
    content: string;
    pinned: boolean;
    image: string | null;
    background_color: string | null;
}
