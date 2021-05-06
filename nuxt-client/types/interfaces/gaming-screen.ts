export interface Rect{
    x: number;
    y: number;
    image: string;
}
export interface RectRow {
    row: [Rect?, Rect?, Rect?, Rect?];
}
export interface ScoreBoard {
    score: number;
    highscore: number;
}

