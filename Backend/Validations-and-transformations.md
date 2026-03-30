## Validations and Transformations

### Introduction

Validations and transformations are about keeping a set of rules and guidelines in mind while designing APIs.

These are mostly related to:
- Data integrity
- Security

---

### Backend Architecture Layers

#### Repository Layer
- Handles database operations
- Queries, insertions, deletions
- Works with:
  - Relational DB
  - Redis
  - Other storage

---

#### Service Layer
- Contains business logic
- Calls repository methods
- Performs:
  - DB interactions
  - Notifications
  - Emails
  - Webhooks

---

#### Controller Layer
- Entry point for requests
- Handles HTTP logic:
  - Status codes
  - Response format
- Calls service layer
- Returns response to client

---

### Flow

Client → Controller → Service → Repository → DB   
Response flows back the same way.

---

### Where Validations & Transformations Happen

- After route matching
- Before controller logic execution
- Before calling service layer

---

### Purpose

Ensure:
- Data is in expected format
- Prevent unexpected states
- Avoid system failures

---

### Example Validation

Expected JSON:
{
  "name": "string (5-100 chars)"
}

Validation steps:
1. Check field exists
2. Check type (string)
3. Check length

---

### Why Needed

Without validation:
- Wrong data reaches DB
- DB throws error
- Server returns 500 (bad UX)

With validation:
- Server returns 400 (client error)

---

### Types of Validation

#### 1. Syntactic Validation

Checks structure:
- Email format
- Phone format
- Date format

---

#### 2. Semantic Validation

Checks meaning:
- DOB cannot be future
- Age cannot be 365

---

#### 3. Type Validation

Checks datatype:
- String
- Number
- Boolean
- Array

---

### Transformation

Definition:
- Converting data into required format

---

### Example

Query params:
?page=2&limit=20

Received as:
"2", "20" (strings)

Transform to:
2, 20 (numbers)

---

### Transformation Use Cases

- String → Number
- Uppercase → lowercase email
- Add "+" to phone
- Format dates

---

### Validation + Transformation Pipeline

- Done together
- Single place for input logic

---

### Complex Validation

Examples:
- Password = Confirm Password
- If married = true → partner required

---

### Frontend vs Backend Validation

#### Frontend Validation
- Purpose: UX
- Immediate feedback

#### Backend Validation
- Purpose:
  - Security
  - Data integrity

---

### Important Rule

Never rely only on frontend validation.

Reason:
- APIs can be called directly (Postman, insomnia, etc.)

---

### Summary

- Validate at entry point
- Be strict with data
- Use transformation for compatibility
- Backend validation is mandatory
