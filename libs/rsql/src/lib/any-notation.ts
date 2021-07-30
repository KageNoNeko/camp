import { LongNotation } from './long-notation';
import { MapNotation } from './map-notation';
import { ScopeNotation } from './scope-notation';
import { ShortNotation } from './short-notation';

export type AnyNotation = LongNotation | ShortNotation | MapNotation | ScopeNotation;
