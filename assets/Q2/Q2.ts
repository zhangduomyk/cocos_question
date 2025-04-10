/**
按照要求在 {@link Q2.onStartBtnClick} 中编写一段异步任务处理逻辑，具体执行步骤如下：
1. 调用 {@link Q2.loadConfig} 加载配置文件，获取资源列表
2. 根据资源列表调用 {@link Q2.loadFile} 加载资源文件
3. 资源列表中的所有文件加载完毕后，调用 {@link Q2.initSystem} 进行系统初始化
4. 系统初始化完成后，打印日志

- 附加要求
1. 加载文件时，需要做并发控制，最多并发 3 个文件
2. 加载文件时，需要添加超时控制，超时时间为 5 秒
3. 加载文件失败时，需要对单文件做 backoff retry 处理，重试次数为 3 次
4. 对错误进行捕获并打印输出
*/

const {ccclass, property} = cc._decorator;

@ccclass
export default class Q2 extends cc.Component {
    public async onStartBtnClick() {
        // TODO: 请在此处开始作答
    }

    // #region 以下是辅助测试题而写的一些 mock 函数，请勿修改

    /**
     * 加载配置文件
     * @returns 文件列表
     */
    public async loadConfig(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            console.log('load config start');
            setTimeout(() => {
                if (Math.random() > 0.01) {
                    console.log('load config success');
                    const files: string[] = [];
                    for (let i = 0; i < 100; i++) {
                        files.push(`file-${i}`);
                    }
                    resolve(files);
                } else {
                    console.log('load config failed');
                    reject();
                }
            }, 1000);
        });
    }

    /**
     * 加载文件
     * @param file 
     * @returns 
     */
    public async loadFile(file: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`load file start: ${file}`);
            setTimeout(() => {
                if (Math.random() > 0.01) {
                    console.log(`load file success: ${file}`);
                    resolve();
                } else {
                    console.log(`load file failed: ${file}`);
                    reject();
                }
            }, Math.floor(Math.random() * 2000) + 1000);
        });
    }

    /**
     * 初始化系统
     * @returns 
     */
    public async initSystem(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('init system start');
            setTimeout(() => {
                console.log('init system success');
                resolve();
            }, 1000);
        });
    }

    // #endregion
}
