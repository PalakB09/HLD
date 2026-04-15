# API Design

## Introduction

API design is something that as a backend engineer, you will spend a lot of time working on and thinking about. It is one of the most important concepts.

This focuses on REST APIs.

Problems developers face:
- Should URI be plural or singular?
- PATCH vs PUT?
- What HTTP method for custom actions?
- Which status code to use?

Goal:
- Extract consistent rules
- Follow standards
- Reduce confusion
- Focus on business logic

---

## History of Web & REST

### Tim Berners-Lee (1990)

Created World Wide Web to share knowledge.

Invented:
- URI
- HTTP
- HTML
- First browser
- First server
- WYSIWYG

---

## Problem: Scaling

Web grew rapidly → not scalable.

---

### Roy Fielding (1993)
https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm
https://www.cems.uwe.ac.uk/~pchatter/2011/atwd/RoyFielding_REST.pdf

Proposed constraints for scalability:

---

## REST Constraints

### 1. Client-Server
- Separation of concerns
- UI vs backend

---

### 2. Uniform Interface

Standard communication

Sub-parts:
- Resource identification
- Representation
- Self-descriptive messages
- HATEOAS

---

### 3. Layered System
- Each layer interacts with next layer only
- Enables proxies, load balancers

---

### 4. Cache
- Responses labeled cacheable/non-cacheable

---

### 5. Stateless
- Each request is independent
- No memory of previous requests

---

### 6. Code on Demand (optional)
- Server can send executable code (JS)

---

## REST Origin

- HTTP 1.1 created
- Fielding defined REST in PhD
- REST = Representational State Transfer

---

## Meaning of REST

### Representation
- Data format (JSON, XML, HTML)
json (server to server)
html (server to client)
---

### State
- Current condition of resource

Example:
Cart → items + quantity + price

---

### Transfer
- Data exchange via HTTP
- using the methods
---

## REST Summary

- Resources have representations
- State transferred client ↔ server
- Uses HTTP
- Follows constraints

---

## URL Structure

Components:
- Scheme (http/https)
- Domain/authority
- Path/resource
- Query params
- Fragment

---

## API URL Best Practices

Example:
https://api.example.com/v1/books

Rules:
- Use subdomain: api
- Versioning: v1
- Use plural nouns
- No underscores or spaces
- Use hyphen for slugs and lowercase

Example slug:
harry-potter

---

## Resource Hierarchy

/books → collection  
/books/1 → specific resource  

---

## Idempotency

Definition:
Same request → same effect
-> what effect the client makes to the server, they should not be different with each request
---

### GET
- Idempotent
- No side effects

---

### PUT & PATCH
- Idempotent
- Same update → same result

---

### DELETE
- Idempotent
- First deletes
- Next calls → no change

---

### POST
- NOT idempotent
- Creates new resource each time

---

## Custom Actions

Use POST when:
- Not CRUD
Example:
send email

---

## API Design Workflow

1. Start from UI (Figma)
2. Identify resources (nouns)
3. Design DB schema
4. Define actions (CRUD)
5. Design API interface

---

## Resources Example (Project System)

- Users
- Projects
- Organizations
- Tasks
- Tags

---
## Schema Design
<img width="940" height="505" alt="image" src="https://github.com/user-attachments/assets/0ad1eee2-c2b4-46c2-ae52-3fe49b881503" />


## CRUD Actions

- Create
- Read (list + single)
- Update
- Delete

---

## API Design Example

### List Organizations

GET /organizations

---

### Create Organization

POST /organizations

Payload:
{
  "name": "org",
  "status": "active",
  "description": "desc"
}

Response:
- 201 Created
- returns object

---

## Status Codes

- 200 → success
- 201 → created
- 404 → not found

---

## Pagination


Purpose:
- Avoid sending huge data
- Improve performance
- sends only a particular portion
- eg deserialisation and serialisation take some time 
---

### Parameters

- limit
- page 

<img width="268" height="201" alt="image" src="https://github.com/user-attachments/assets/c5d04bd6-a7be-45fe-becc-6cf9e24d7f7f" />
---
### Response

{
  "data": [],
  "total": 50,
  "page": 1,
  "totalPages": 5
}

---

### Behavior

- limit = items per page
- page = which chunk

---

## Sorting

Parameters:
- sortBy
- sortOrder

Example:
?sortBy=name&sortOrder=asc

---

## Defaults Rule

Server should set defaults:
- page = 1
- limit = 10
- sort = default field
- sortOrder= asc
<img width="781" height="361" alt="image" src="https://github.com/user-attachments/assets/11a01c98-e3f9-4138-8246-db6676afabca" />

---

## Key Design Principles

- Follow standards
- Avoid guesswork
- Make API predictable
- Reduce integration effort

---
## Sorting Behavior (Continuation)

When no sorting parameters are passed:

- Server MUST apply default sorting
- Typically:
  - sortBy = createdAt
  - sortOrder = desc

Reason:
- Databases do NOT guarantee order
- Without sorting → inconsistent responses

---

## Filtering (Important in List APIs)

List APIs should support filtering.

Example:
```
GET /organizations?status=active
```

Use cases:
- Filter by status
- Filter by date
- Filter by user

---

## Combining Query Params

Client should be able to combine:

```
/organizations?page=1&limit=10&sortBy=name&sortOrder=asc&status=active
```

---

## GET Single Resource

### Endpoint

```
GET /organizations/:id
```

---

### Rules

- Still plural → `/organizations`
- ID defines specific resource
- Return 200 if found
- Return 404 if not found

---

## UPDATE Resource

### PATCH (Partial Update)

```
PATCH /organizations/:id
```

Payload:
```
{
  "name": "new name"
}
```
<img width="620" height="264" alt="image" src="https://github.com/user-attachments/assets/683f2958-142c-4ec8-b3a8-cfeeeb0480db" />

---

### PUT (Full Replace)

```
PUT /organizations/:id
```

Payload:
- Entire object required

---

## DELETE Resource

```
DELETE /organizations/:id
```

Behavior:
- First call → deletes resource
- Next calls → 404 (not found)
Dont send 404 in list api calls, saay if we sort by filter and no content then just send 200 ok with 0 not 404
Still idempotent.

---

## Eg Archiving of org
Dont just update the staate, it is custom action
Use post request
`/projects/:id/action-name`
<img width="757" height="417" alt="image" src="https://github.com/user-attachments/assets/6424f91f-3220-454e-829e-4161bcbc31f0" />

## Naming Rules Summary

- Use plural nouns → `/users`, `/projects`
- Avoid verbs in URLs
  wrong `/getUsers`
  wrong `/createUser`
  right `/users`

- Use HTTP methods for action

---

## Path Design Rules

- Use `/` for hierarchy
- Keep URLs clean
- Avoid deep nesting
- Use Camel Case in json
  
Bad:
```
/org/project/task/user/details
```

Good:
```
/projects/:id/tasks
```

---

## Error Handling

Use proper status codes:

- 400 → bad request
- 401 → unauthorized
- 403 → forbidden
- 404 → not found
- 500 → server error

---

## Response Structure (Standard)

### Success

```
{
  "data": {},
  "message": "success"
}
```

---

### Error

```
{
  "error": {
    "message": "Something went wrong",
    "code": "INVALID_INPUT"
  }
}
```

---

## API Design Philosophy

### 1. Consistency

- Same patterns everywhere
- Same naming conventions

---

### 2. Predictability

- Developer should guess behaviour without docs

---

### 3. No Guesswork

Bad API:
- Needs trial & error

Good API:
- Self-explanatory

---

### 4. Follow Standards

Reason:
- Faster integration
- Fewer bugs
- Less confusion

---

## Important Insight

If you don’t follow standards:

- Users must:
  - Read code
  - Experiment with APIs
- Leads to:
  - Bugs
  - Friction
  - Poor developer experience

---

## Starting Point for API Design

Start from:

- UI / Wireframes (Figma)

NOT from backend.

Reason:
- UI defines data needs
- Helps identify resources

---

## Resource Identification

From requirements, extract nouns:

Example:

Project Management App:
- Users
- Projects
- Organizations
- Tasks
- Tags

---

## Workflow Summary

1. Understand UI
2. Identify resources
3. Design DB schema
4. Define actions (CRUD)
5. Design API endpoints, documentation using **Swagger API **
6. Then write code

---
## Final Takeaways

- REST is about structure + scalability
- Use plural resources
- Follow HTTP semantics
- Implement pagination & sorting
- Design before coding
  <img width="305" height="180" alt="image" src="https://github.com/user-attachments/assets/19a65d6e-0b92-4632-8a7c-362a0df9e82a" />


