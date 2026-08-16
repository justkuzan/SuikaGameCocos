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
  math,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SpawnerController")
export class SpawnerController extends Component {
  @property(Number)
  public leftBound: number = 0;
  @property(Number)
  public rightBound: number = 0;
  @property(Number)
  public yBound: number = 0;

  private newPosition: Vec3 = new Vec3(0, 0, 0);
  private LocalVec3: Vec3 = new Vec3(0, 0, 0);

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
    this.newPosition.set(currentUIPosition.x, currentUIPosition.y);

    // Convert to local coordinates
    this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(this.newPosition, this.LocalVec3);
    // this.LocalVec3.y = this.yBound;

    this.node.translate(this.LocalVec3);
    // this.node.setPosition(this.LocalVec3);
    // this.node.getPosition(this.LocalVec3);

    if (this.node.position.x <= this.leftBound) {
      this.node.setPosition(this.leftBound, this.yBound, 0);
    } else if (this.node.position.x >= this.rightBound) {
      this.node.setPosition(this.rightBound, this.yBound, 0);
    }

    this.node.setPosition(this.node.position.x, this.yBound, 0);

    console.log(this.node.position);
  }
}
