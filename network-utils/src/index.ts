/// <reference lib="es5"/>
/// <reference lib="es2015.core"/>
// tslint:disable-next-line:no-import-side-effect
import './promise.finally';
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type ParamsType = Record<string, string | number | boolean | null> | (string | number | boolean | null)[];

/**
 * 构建url参数
 * /users/{id} ==> /users/123
 * @param url - url 相对地址或者绝对地址
 * @param params - Obejct 键值对 替换的参数列表
 * @param baseUrl - 根目录，当url以https://或者http://开头忽略此参数
 * @returns 完整参数URL
 */
export function buildParams(
    url: string,
    params?: ParamsType,
    baseUrl?: string
): string {
    if (url && params) {
        Object.keys(params)
            .forEach((key) => {
                // tslint:disable-next-line:no-parameter-reassignment prefer-type-cast
                url = url.replace(new RegExp(`{${key}}`, 'g'), params[key as keyof ParamsType] as string);
            });
    }
    // tslint:disable-next-line:no-http-string
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
        return url;
    } else {
        return (baseUrl || '') + url;
    }
}

/**
 * 合并公共配置
 * @param data - new configuration
 * @param options - default global configuration
 * @param keys - default common keys
 */
export function getCommonOptions<T extends { [key: string]: any }>(
    data: T,
    options: { [key: string]: any },
    keys: string[] = ['jump', 'timestamp', 'timeout', 'onTimeout']
): T {
    keys.forEach((v) => {
        if (options[v] !== undefined) {
            data[v] = options[v];
        }
    });

    return data;
}
