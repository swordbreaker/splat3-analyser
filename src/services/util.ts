export async function loadJson<T>(path: string) {
    return await fetch(path)
        .then((response) => response.json() as T);
}

export const baseUrl = process.env.NODE_ENV == 'production' ? '/splat3-analyser/' : '/';