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

    private onShowBtnClick() {
        // TODO: 请在此处开始作答
    }
}
