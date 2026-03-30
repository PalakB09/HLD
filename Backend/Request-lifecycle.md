## Handlers, Services, Repository Pattern, Middleware & Request Context 

### Introduction
The main components are:
- Handlers (Controllers)
- Services
- Repository Layer
- Middleware
- Request Context

---

### Complete Request Lifecycle

Client → Router → Middleware → Handler → Service → Repository → Database  
Then response flows back the same way.

---

### Handlers (Controllers)

Handlers are the entry point of the backend logic.

Responsibilities:
- Receive HTTP request
- Extract parameters (body, query, params)
- Call service layer
- Send HTTP response
- deserialises to native format (say json to struct) (Binding 400 bad request)
- validation
- transformations (query paraams should be made optionaal, but if say date comes empty then add by default date using transformations) 
 
Important:
- Should NOT contain business logic
- Only handle HTTP concerns

---

### Service Layer

Service layer contains the core business logic.

Responsibilities:
- Process data
- Apply rules
- Coordinate between multiple repositories
- Call external services if needed
- merge different data from DBs
- orchestrates diff repositories

Important:
- No HTTP logic here
- Pure logic layer

---

### Repository Layer

Handles database interactions.

Responsibilities:
- CRUD operations
- Query execution
- Data persistence

Examples:
- SQL queries
- MongoDB operations
- Redis access

Important:
- No business logic
- Only data access

---

### Middleware

Middleware runs before the handler(Req+res), routing, services.
middleware gets req+res+next function
It acts like a pipeline.
it is a fucntion that needs to be executed for many api calls
Each middleware:
- Receives request
- Can modify request/response
- Decides whether to pass control

---

#### next()

- next() passes control to next middleware
- If not called → request stops

---

#### Middleware Order Matters

Types of middleware:
1. Security - cors (first middleware), rate limit
2. Logging
3. Authentication
4. Authorization
5. global Error Handler - mostly added in the last layer so that if any error is there in the between we can struccture it and then send the response


---

#### Early Termination

Middleware can stop request:

Example:
- Invalid token → return 401
- Do not call next()

---

### Common Middleware Types

#### Authentication Middleware
- Verifies user identity
- Extracts token
- Adds user info to context

---

#### Authorization Middleware
- Checks permissions
- Validates roles

---

#### Logging Middleware
- Logs request details
- Used for debugging

---

#### Rate Limiting Middleware
- Limits number of requests
- Prevents abuse

---

#### CORS Middleware
- Handles cross-origin requests

---

#### Error Handling Middleware
- Catches errors
- Returns proper responses

---

#### Compression Middleware
- Compresses responses

---

#### Data Parsing Middleware
- Parses JSON body
- Converts request data

---

### Request Context

Context is a shared object across request lifecycle.

Used to store:
- User data
- Request ID
- Metadata

---

#### Why Context?

- Avoid passing data manually
- Share data across layers

---

#### Use Cases

- Authentication info
- Logging correlation ID
- Request tracing

---

#### Microservices Use

Context helps propagate:
- Request ID across services
- Debugging distributed systems

---

#### Cancellation & Deadlines

Context can:
- Cancel long requests
- Set timeouts

---

### Final Understanding

- Handler → HTTP layer
- Service → Business logic
- Repository → Data layer
- Middleware → Pre-processing
- Context → Shared state
