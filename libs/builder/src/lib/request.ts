export interface Request<M, B, R> {
    method: M;
    url: string;
    headers?: Headers;
    params?: URLSearchParams;
    body?: B;
    // for response type tracking
    response?: R;
}
