import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "pocket.json");


type CacheData = Record<string, any>;


function readCacheFile(): CacheData {
    try {
        if (!fs.existsSync(CACHE_FILE)) {
            return {};
        }

        const content = fs.readFileSync(CACHE_FILE, "utf-8");

        if (!content) {
            return {};
        }

        return JSON.parse(content);

    } catch (error) {
        console.error("Cache read error:", error);
        return {};
    }
}


function writeCacheFile(data: CacheData): void {
    try {
        fs.writeFileSync(
            CACHE_FILE,
            JSON.stringify(data, null, 2),
            "utf-8"
        );

    } catch (error) {
        console.error("Cache write error:", error);
    }
}


export function setCache(
    key: string,
    value: any
): void {

    const cache = readCacheFile();

    cache[key] = value;

    writeCacheFile(cache);
}


export function getCache<T = any>(
    key: string
): T | null {

    const cache = readCacheFile();

    return cache[key] ?? null;
}


export function removeCache(
    key: string
): void {

    const cache = readCacheFile();

    delete cache[key];

    writeCacheFile(cache);
}


export function clearCache(): void {
    writeCacheFile({});
}


const lastUpdateCategories = "lastUpdateCategories";
export function setLastUpdateCategories(date: Date) {
    setCache(lastUpdateCategories, date.toISOString());
}
export function getLastUpdateCategories(): Date | null {
    const value = getCache<string>(lastUpdateCategories);
    if (!value) {return null;}
    return new Date(value);
}

const nextRandomDayCount = "nextRandomDayCount";
export function setNextRandomArticleCategoryUpdateDayCount(num: number) {
    setCache(nextRandomDayCount, num.toString());
}
export function getNextRandomArticleCategoryUpdateDayCount(): number {
    const value = getCache<number>(nextRandomDayCount);
    if (!value) {return 38;}
    return value;
}
