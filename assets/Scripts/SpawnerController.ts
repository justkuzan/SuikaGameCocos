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
  UITransform,
  Vec2,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SpawnerController")
export class SpawnerController extends Component {
  private _tempUIVec3: Vec3 = new Vec3(0, 0, 0);
  private _tempLocalVec3: Vec3 = new Vec3(0, 0, 0);

  protected onLoad(): void {
    // input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // input.on(Input.EventType.TOUCH_MOVE, this.onTouchStart, this);
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }
  protected onDestroy(): void {
    // input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // input.off(Input.EventType.TOUCH_MOVE, this.onTouchStart, this);
    input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }

  onMouseMove(event: EventMouse) {
    this.upgradePosition(event);
  }

  upgradePosition(event: EventMouse) {
    const currentUIPosition = event.getUILocation();
    this._tempUIVec3.set(currentUIPosition.x, currentUIPosition.y);

    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this._tempUIVec3, this._tempLocalVec3);

    this.node.setPosition(this._tempLocalVec3);
  }
}
