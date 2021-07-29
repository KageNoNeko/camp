export type WritablePartially<T, K extends keyof T> = Omit<T, K> & {
    -readonly [P in K]: T[P];
};
