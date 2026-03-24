/*
请仔细观察根目录中提供的知名消除游戏 Candy Crush 录屏中，选关界面对话框 Play 按钮的动画效果，请复刻这一效果，使用代码实现或者 Animation 均可，动画包括：
- 按钮出现
- 按钮按下
- 按钮弹起
*/

const {ccclass, property} = cc._decorator;

@ccclass
export default class Q3 extends cc.Component {
    @property(cc.Node)
    private playNode: cc.Node = null;
    private spriteNode: cc.Node = null;

    protected start() {
        this.onShowBtnClick();
    }

    private onShowBtnClick() {
        this.spriteNode = this.playNode.getComponent(cc.Sprite)
            ? this.playNode
            : this.playNode.getComponentInChildren(cc.Sprite)?.node;

        this.playNode.on(cc.Node.EventType.TOUCH_START, this.onPress, this);
        this.playNode.on(cc.Node.EventType.TOUCH_END, this.onRelease, this);
        this.playNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onRelease, this);
    }
    
    private showBtnClick() {
        this.playNode.scaleX = 0;
        this.playNode.scaleY = 0;
        this.playNode.angle = 0;
        this.playNode.opacity = 0;

        cc.tween(this.playNode)
            .parallel(
                cc.tween().to(0.35, { scaleX: 1.1 }, { easing: "sineOut" }),
                cc.tween().to(0.2, { scaleY: 1.1 }, { easing: "sineOut" })
                    .to(0.15,{scaleY: 0.9}, { easing: "sine" }),
                cc.tween()
                    .to(0.18, { angle: 6 })
                    .to(0.17, { angle: -6 })
                    .to(0.1, { angle: 0 }),
                cc.tween().to(0.2, { opacity: 255 })
            )
            .to(0.1, { scaleX: 1, scaleY: 1 })
            .start();
    }

    private onPress() {
        if (this.spriteNode)
            this.spriteNode.color = new cc.Color(170, 170, 170);

        cc.tween(this.playNode)
            .stop()
            .to(0,{angle : 0})
            .to(0.06, { scaleX: 0.85, scaleY: 0.75 }, { easing: "sineOut" })
            .to(0.08, { scaleX: 0.95, scaleY: 0.88 }, { easing: "sineOut" })
            .to(0.06, { scaleX: 0.9, scaleY: 0.82 }, { easing: "sine" })
            .start();
    }

    private onRelease() {
        if (this.spriteNode)
            this.spriteNode.color = cc.Color.WHITE;

        cc.tween(this.playNode)
            .stop()
            .to(0, { angle: 0 })
            .to(0.16, { scaleX: 1.08, scaleY: 1.12 }, { easing: "sineOut" })
            .to(0.10, { scaleX: 0.98, scaleY: 0.96 }, { easing: "sineInOut" })
            .to(0.08, { scaleX: 1.03, scaleY: 1.04 }, { easing: "sineOut" })
            .to(0.08, { scaleX: 1, scaleY: 1 }, { easing: "sineOut" })
            .start();
    }
}