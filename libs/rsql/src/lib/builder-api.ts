import { ComparisonOperator, ExpressionNode } from '@rsql/ast';
import { Scope } from './scope';
import { Value } from './value';
import { ValueMap } from './value-map';

export interface BuilderApi {
    expression?: ExpressionNode;

    and(selector: string, operator: ComparisonOperator, value: Value): this;
    and(selector: string, value: Value): this;
    and(map: ValueMap): this;
    and(scope: Scope): this;

    or(selector: string, operator: ComparisonOperator, value: Value): this;
    or(selector: string, value: Value): this;
    or(map: ValueMap): this;
    or(scope: Scope): this;

    where(selector: string, operator: ComparisonOperator, value: Value): this;
    where(selector: string, value: Value): this;
    where(map: ValueMap): this;
    where(scope: Scope): this;

    toString(): string;
}
