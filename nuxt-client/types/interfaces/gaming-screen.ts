export interface Rect {
    x: number;
    y: number;
    image: string;
}
export interface RectArray<T> {
    array: [T?, T?, T?, T?];
}

export interface ScoreBoard {
    score: number;
    highscore: number;
}
