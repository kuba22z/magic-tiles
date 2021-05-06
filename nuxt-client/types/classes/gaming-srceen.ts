import {Rect, RectRow, ScoreBoard} from "~/types/interfaces/gaming-screen";

export class RectImpl implements Rect{
  image: string;
  x: number;
  y: number;

  constructor(x:number =0,y:number=0,image:string="") {
    this.x=x;
    this.y=y;
    this.image=image
  }
}


export class RectRowImpl implements RectRow {

  row: [Rect?, Rect?, Rect?, Rect?]=[];
  constructor(y: number = 0) {
    for (let x = 0; x < 100; x += 25) {
      this.row.push(new RectImpl(x, y))
    }
  }
}
export class ScoreBoardImpl implements ScoreBoard{
  highscore: number;
  score: number;

  constructor(highscore:number=0,score:number=0) {
    this.highscore=highscore;
    this.score=score;
  }

}








