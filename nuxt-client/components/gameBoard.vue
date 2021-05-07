<template>
    <div>
        <svg height="426" width="282" class="border border-blue-600">
            <GameRow v-for="rectRow in rectBoard.array" :rect-row="rectRow" />
        </svg>

        <button class="test-btn border border-black w-40" @click="initStart(30)">
            Test
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";
import GameRow from "~/components/gameRow.vue";
var i=0;
var stepSize =2.5,bigStep=25/stepSize ;
var fpsInterval :number ,startTime :number, now :number, then :number, elapsed :number;


const board = namespace("game-board");
@Component({
    components: { GameRow, Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rectBoard!: RectArray<RectArray<Rect>>;

    @board.Mutation
    public moveRectRowDown!: (stepSize: number) => void;

    @board.Mutation
    public pushFrontAndPop!: () => void;

/*
  public useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
*/
    /**
     *@describe Endless loop which move all RectRow to the bottom
     * and creates new rectRows at the top
     */
    public startGame() {
      // request another frame
      //requsetAnimationFrame is a better endless loop for animations than setIntervall
      requestAnimationFrame(this.startGame);

      // calc elapsed time since last loop
      now = Date.now();
      elapsed = now - then;
      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        this.moveRectRowDown(stepSize);
        i++;
        if (i === bigStep) {
          this.pushFrontAndPop();
          i = 0;
        }
      }
    }
  public initStart(fps :number) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    this.startGame();
  }

}
</script>
