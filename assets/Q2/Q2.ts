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
        try {
            const files = await this.loadConfig();
            await this.loadFilesWithConcurrency(files, 3);
            await this.initSystem();
            console.log('All done');
        } catch (err) {
            console.error('Error in start process:', err);
        }
    }

    private async loadFileWithRetry(file: string, retries = 3, timeout = 5000): Promise<void> {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await this.promiseWithTimeout(this.loadFile(file), timeout);
                return;
            } catch (err) {
                console.warn(`File ${file} attempt ${attempt} failed:`, err);
                if (attempt === retries) {
                    console.error(`File ${file} failed after ${retries} retries`);
                    throw err;
                }
                await new Promise(res => setTimeout(res, 500 * attempt));
            }
        }
    }

    private promiseWithTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('timeout'));
            }, ms);

            promise.then(res => {
                clearTimeout(timer);
                resolve(res);
            }).catch(err => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }
    
    private async loadFilesWithConcurrency(files: string[], concurrency: number) {
        return new Promise<void>((resolve, reject) => {
            let index = 0;
            let active = 0;
            let hasError = false;

            const next = () => {
                if (hasError) return;

                if (index >= files.length && active === 0) {
                    resolve();
                    return;
                }

                while (active < concurrency && index < files.length) {
                    const file = files[index++];
                    active++;
                    this.loadFileWithRetry(file)
                        .catch(err => {
                            hasError = true;
                            reject(err);
                        })
                        .finally(() => {
                            active--;
                            next();
                        });
                }
            };

            next();
        });
    }

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
