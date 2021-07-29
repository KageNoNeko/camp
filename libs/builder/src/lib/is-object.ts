export function isObject<T>(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object';
}
