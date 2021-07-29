<div align="center">
    <h1>Camp builder</h1>
    <p>Transport-agnostic chainable builder for requests</p>
</div>

## Example

```typescript
import { Builder, Method, Request } from '@camp/builder';

function dispatch(request: Request): any {
}

const getUsers = new Builder(Method.Get, '/users')
    .param('order', '-name')
    .param('page', 2)
    .head('Accept', 'application/json');

dispatch(getUsers);

const createUser = new Builder(Method.Put, `/users`)
    .payload({ name: 'Alex' })
    .head('Accept', 'application/json')
    .head('Content-Type', 'application/json');

dispatch(createUser);

const userId = 42;
const updateUser = new Builder(Method.Put, `/users/${userId}`)
    .payload({ name: 'Alex' })
    .head('Accept', 'application/json')
    .head('Content-Type', 'application/json');

dispatch(updateUser);

const deleteUser = new Builder(Method.Delete, `/users/${userId}`);

dispatch(deleteUser);
```
