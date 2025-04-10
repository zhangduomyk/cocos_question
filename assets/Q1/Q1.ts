/**
界面上有三个输入框，分别对应 X,Y,Z 的值，请实现 {@link Q1.onGenerateBtnClick} 函数，生成一个 10 × 10 的可控随机矩阵，并显示到界面上，矩阵要求如下：
1. {@link COLORS} 中预定义了 5 种颜色
2. 每个点可选 5 种颜色中的 1 种
3. 按照从左到右，从上到下的顺序，依次为每个点生成颜色，(0, 0)为左上⻆点，(9, 9)为右下⻆点，(0, 9)为右上⻆点
4. 点(0, 0)随机在 5 种颜色中选取
5. 其他各点的颜色计算规则如下，设目标点坐标为(m, n）：
    a. (m, n - 1)所属颜色的概率为基准概率加 X%
    b. (m - 1, n)所属颜色的概率为基准概率加 Y%
    c. 如果(m, n - 1)和(m - 1, n)同色，则该颜色的概率为基准概率加 Z%
    d. 其他颜色平分剩下的概率
*/

const {ccclass, property} = cc._decorator;

const COLORS = [
    cc.Color.RED,
    cc.Color.GREEN,
    cc.Color.BLUE,
    cc.Color.YELLOW,
    cc.Color.ORANGE,
];

// 每个格子的大小
const GRID_ITEM_SIZE = 60;

@ccclass
export default class Q1 extends cc.Component {

    @property(cc.EditBox)
    private xEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private yEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private zEditBox: cc.EditBox = null;

    @property(cc.Node)
    private gridRootNode: cc.Node = null;

    @property(cc.Prefab)
    private gridItemPrefab: cc.Prefab = null;

    public onGenerateBtnClick() {
        // TODO: 请在此处开始作答
    }
}
