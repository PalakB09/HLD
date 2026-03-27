## Routing in HTTP 

## 1. Introduction to Routing

- HTTP Methods define WHAT  
  - GET → fetch  
  - POST → create  
  - PATCH → update  
  - DELETE → delete  

- Routing defines WHERE  

### Key Idea

HTTP Method = WHAT (intent)  
Route (URL path) = WHERE (resource)

---

### Example

GET /users

- GET → fetch data  
- /users → users resource  

Server returns list of users.

---

### Definition

Routing = Mapping of (HTTP Method + URL Path) -> Server-side handler

---

## 2. How Routing Works Internally

1. Server reads:
   - Method
   - Route

2. Combines them as a unique key

3. Maps to:
   - Handler
   - Business logic
   - Database operations

---

### Example

GET /api/books → fetch books  
POST /api/books → create book  

Same route, different methods → different handlers

---

## 3. Static Routes

### Definition

Routes with no variable parts

---

### Example

/api/books

---

### Characteristics

- Fixed string  
- No parameters  
- Same response type  

---

## 4. Dynamic Routes (Path Parameters)

### Definition

Routes with variable segments

---

### Example

GET /api/users/123

---

### Server Pattern

/api/users/:id

---

### Matching

/api/users/123 → id = "123"

---

### Notes

- Values are always treated as strings  

---

### Meaning

GET /api/users/123 → fetch user with id 123

---

## 5. Path Parameters

- Dynamic values in URL  
- Also called route parameters  

Example:

/api/users/:id

---

### Usage

- Identify specific resource  
- Represent hierarchy  

---

## 6. Query Parameters

### Definition

Key-value pairs after ?

---

### Example

/api/search?query=some+value

---

### Structure

?key=value&key2=value2

---

### Why Needed

- GET requests don’t have body  
- Used to send data  

---

### Example

/api/search?query=iphone

---

### Why Not Path Params

/api/search/iphone → not semantic  

Correct:

/api/search?query=iphone

---

## 7. Query Parameters Use Cases

### Pagination

/api/books?page=2

---

### Response Example

{
  "data": [...],
  "total": 100,
  "currentPage": 1,
  "totalPages": 5
}

---

### Other Uses

- Filtering  
- Sorting  
- Searching  

---

### Summary

Path Params → identify resource  
Query Params → modify request  

---

## 8. Nested Routes

### Definition

Routes with multiple levels

---

### Example

/api/users/123/posts/456

---

### Meaning

- /users → all users  
- /users/123 → specific user  
- /users/123/posts → posts of user  
- /users/123/posts/456 → specific post  

---

### Semantic Meaning

Fetch post 456 of user 123

---

### Why Needed

- Express relationships  
- Improve readability  

---

## 9. Route Versioning & Deprecation

### Example

/api/v1/products  
/api/v2/products  

---

### Problem

API structure changes

---

### Example Change

V1:
{
  "id": 1,
  "name": "item",
  "price": 100
}

V2:
{
  "id": 1,
  "title": "item",
  "price": 100
}

---

### Solution

- Keep both versions  
- Avoid breaking clients  

---

### Benefits

- Backward compatibility  
- Safe upgrades  

---

### Deprecation Flow

1. Release V2  
2. Notify clients  
3. Migrate  
4. Remove V1  

---

## 10. Catch-All Routes

### Definition

Fallback route for unknown paths

---

### Example

/*

---

### Purpose

- Handle invalid routes  
- Return proper error  

---

### Example

/api/v3/products → route not found  

Response:
{
  "error": "Route not found"
}

---

## 11. Complete Flow

1. Client sends request  
2. Server matches method + route  
3. Extracts params  
4. Executes logic  
5. Returns response  
