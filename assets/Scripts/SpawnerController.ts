import {
  _decorator,
  Component,
  EventMouse,
  EventTouch,
  Input,
  input,
  Node,
  Sprite,
  SpriteComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SpawnerController")
export class SpawnerController extends Component {
  protected onLoad(): void {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // input.on(Input.EventType.TOUCH_MOVE, this.onTouchStart, this);
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  protected onDestroy(): void {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // input.off(Input.EventType.TOUCH_MOVE, this.onTouchStart, this);
    input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
}
