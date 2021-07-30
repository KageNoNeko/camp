<div align="center">
    <h1>RSQL builder</h1>
    <p>Chainable builder for RSQL</p>
</div>

## Example

```typescript
import { Builder } from '@camp/rsql';

const query = new Builder();

// implicit operator '=='
query.where('name', 'Alex');

// explicit operator
query.where('name', '!=', 'Alex');

// implicit operator '==' for several params at once
query.where({
    name: 'Alex',
    age: 25,
});

// scope
query.where('name', 'Alex')
    .and((sub) => {
        sub.where('age', 25).or('eyes', '=in=', [ 'blue', 'green' ]);
    });
```
