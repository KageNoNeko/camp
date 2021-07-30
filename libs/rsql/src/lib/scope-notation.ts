import { Scope } from './scope';

export type ScopeNotation<T extends Scope<unknown> = Scope<unknown>> = [ T ];
