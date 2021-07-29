import { isObject } from './is-object';
import { Method } from './method';
import { Request } from './request';
import { RequiredPart } from './required-part';
import { WritablePartially } from './writable-partially';

export class Builder<M = Method, B = unknown, R = unknown> implements Request<M, B, R> {
    readonly headers = new Headers();
    readonly params = new URLSearchParams();
    readonly body?: B;

    constructor(readonly method: M, readonly url: string) {
    }

    head(name: string, value: unknown): this;
    head(map: Record<string, unknown>): this;
    head(header: string | Record<string, unknown>, value?: unknown): this {
        const entries = isObject(header) ? Object.entries(header) : [ [ header, value as string ] ];

        for (const [ name, value ] of entries) {
            this.headers.set(name, `${value}`);
        }

        return this;
    }

    param(name: string, value: unknown): this;
    param(map: Record<string, unknown>): this;
    param(param: string | Record<string, unknown>, value?: unknown): this {
        const entries: Array<[ string, unknown ]> = isObject(param)
            ? Object.entries(param)
            : [ [ param, value as unknown ] ];

        for (const [ name, value ] of entries) {
            this.params.set(name, `${value}`);
        }

        return this;
    }

    payload(body: B): RequiredPart<this, 'body'> {
        (this as WritablePartially<this, 'body'>).body = body;

        return this as RequiredPart<this, 'body'>;
    }
}
