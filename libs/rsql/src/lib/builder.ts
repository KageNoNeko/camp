import { AND, EQ, ExpressionNode, LogicOperator, OR } from '@rsql/ast';
import builder from '@rsql/builder';
import { emit } from '@rsql/emitter';
import { AnyNotation } from './any-notation';
import { ComparisonOperator } from './comparison-operator';
import { isMapNotation } from './is-map-notation';
import { isScopeNotation } from './is-scope-notation';
import { isShortNotation } from './is-short-notation';
import { Scope } from './scope';
import { Value } from './value';
import { ValueMap } from './value-map';

export class Builder<CO extends ComparisonOperator = ComparisonOperator> {
    protected node?: ExpressionNode;

    get expression(): ExpressionNode | undefined {
        return this.node;
    }

    protected addNode(node: ExpressionNode, operator: LogicOperator): this {
        if (this.node) {
            this.node = builder.logic([ this.node, node ], operator);
        } else {
            this.node = node;
        }

        return this;
    }

    protected fromLongNotation(
        selector: string,
        operator: ComparisonOperator,
        value: Value,
        logic: LogicOperator,
    ): this {
        const node = builder.comparison(selector, operator, value);

        return this.addNode(node, logic);
    }

    protected fromShortNotation(selector: string, value: Value, logic: LogicOperator): this {
        return this.fromLongNotation(selector, EQ, value, logic);
    }

    protected fromMapNotation(map: ValueMap, logic: LogicOperator): this {
        for (const [ selector, value ] of Object.entries(map)) {
            this.fromShortNotation(selector, value, logic);
        }

        return this;
    }

    protected fromScopeNotation(scope: Scope<Builder>, operator: LogicOperator): this {
        const builder = new (this.constructor as typeof Builder)();

        scope(builder);

        if (builder.expression) {
            this.addNode(builder.expression, operator);
        }

        return this;
    }

    protected from(notation: AnyNotation, logic: LogicOperator): this {
        if (isScopeNotation(notation)) {
            return this.fromScopeNotation(...notation, logic);
        }

        if (isMapNotation(notation)) {
            return this.fromMapNotation(...notation, logic);
        }

        if (isShortNotation(notation)) {
            return this.fromShortNotation(...notation, logic);
        }

        return this.fromLongNotation(...notation, logic);
    }

    // @todo improve selector type
    where(selector: string, operator: CO, value: Value): this;
    where(selector: string, value: Value): this;
    where(map: ValueMap): this;
    where(scope: Scope<Builder<CO>>): this;
    where(...notation: AnyNotation): this {
        this.from(notation, AND);

        return this;
    }

    and(selector: string, operator: CO, value: Value): this;
    and(selector: string, value: Value): this;
    and(map: ValueMap): this;
    and(scope: Scope<Builder<CO>>): this;
    and(...notation: AnyNotation): this {
        this.from(notation, AND);

        return this;
    }

    or(selector: string, operator: CO, value: Value): this;
    or(selector: string, value: Value): this;
    or(map: ValueMap): this;
    or(scope: Scope<Builder<CO>>): this;
    or(...notation: AnyNotation): this {
        this.from(notation, OR);

        return this;
    }

    toString(): string {
        return this.node ? emit(this.node) : '';
    }
}
