export async function loadJson<T>(path: string) {
    return await fetch(path)
        .then((response) => response.json() as T);
}