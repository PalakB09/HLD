# Databases 

## Why Do We Need Databases?

At its core, a database is used for **persistence**.

### Persistence Definition
Persistence means:
- Storing data in a way that it survives beyond program execution
- Data remains intact across:
  - App restarts
  - Time
  - Different physical locations

### Example: To-Do App

- You add tasks
- Close app
- Reopen → data still exists

Without persistence:
- Data would reset every time
- No continuity

---

## What is a Database?

A database is a **structured storage system**.

### Broad Definition

Any system that:
- Stores data
- Allows CRUD operations:
  - Create
  - Read
  - Update
  - Delete

is a database.

---

### Examples of Databases

- Phone contact list
- Browser localStorage
- Session storage
- Cookies
- Even a text file

---

### Key Insight

Database =  
A **persistent system + CRUD operations**

---

## Databases in Backend Context

In backend systems, database specifically means:

> Disk-based storage systems

---

## Why Disk-Based Storage?

### Two Types of Memory

#### 1. RAM (Primary Memory)
- Very fast
- Expensive
- Limited capacity

Typical sizes:
- 8GB, 16GB, 32GB

---

#### 2. Disk (Secondary Memory)
- Slower
- Cheap
- Large capacity

Typical sizes:
- 512GB → 2TB+

---

### Tradeoff

| Storage | Speed | Cost | Capacity |
|--------|------|------|---------|
| RAM | Fast | Expensive | Low |
| Disk | Slow | Cheap | High |

---

### Why Databases Use Disk

- Need large storage
- Can sacrifice speed
- Cost-efficient

---

### Caching Insight

- Cache (Redis, memory) → RAM → fast
- Database → Disk → slower but large

---

## What is DBMS?

DBMS = Database Management System

### Purpose

- Manage stored data
- Provide efficient access

---

### Responsibilities

#### 1. Data Organization
- Efficient structure for storage and retrieval

#### 2. Access (CRUD)
- Create
- Read
- Update
- Delete

#### 3. Integrity
- Data must be:
  - Correct
  - Valid
  - Consistent

Example:
- Payment field must be numeric
- Not allow string input

---

#### 4. Security
- Prevent unauthorized access
- Role-based access

---

## Why Not Use Text Files?

Before DBMS, data was stored in text files.

### Problems:

---

### 1. Parsing Problem

- Need to manually read file
- Split lines
- Extract fields

Issues:
- Slow
- Error-prone
- Language dependent

---

### 2. No Structure

- No schema
- Any data allowed

Problems:
- No validation
- Inconsistent data

---

### 3. No Data Integrity

- Cannot enforce:
  - Types
  - Constraints

---

### 4. Concurrency Problem

Multiple users updating same data:

Example:
- Initial value = 40

User A:
- +20 → 60

User B:
- -20 → 20

Final value:
- Could be 60 OR 20 (race condition)

---

### Key Issue

No mechanism to handle:
- Simultaneous updates
- Data consistency

---

## Conclusion

Text files fail because:

- No structure
- No integrity
- No concurrency control
- No scalability

---

## Why DBMS Was Created

To solve:
- Parsing inefficiency
- Data inconsistency
- Concurrency issues
- Lack of structure

---

## Types of DBMS

At a high level, there are two major types:

1. Relational Databases
2. Non-Relational Databases (NoSQL)

---

## Relational Databases

### Definition

A relational database:
- Stores data in **tables**
- Uses:
  - Rows
  - Columns

---

### Key Characteristics

#### 1. Structured Data

- Data must follow a **fixed schema**
- Schema must be defined **before inserting data**

---

#### 2. Schema Enforcement

- Each table has:
  - Defined columns
  - Defined data types

Example:
- name → string
- age → number

You cannot insert arbitrary data.

---

#### 3. Consistency

- Every row follows same structure
- Ensures:
  - Data integrity
  - Predictability

---

#### 4. Relationships

- Tables are connected using:
  - Foreign keys

Example:
- users table
- orders table
- orders.user_id → users.id

---

### Advantages

- Strong data integrity
- Reliable structure
- Supports complex queries
- Good for relational data

---

### Examples

- MySQL
- PostgreSQL
- SQL Server

---

### Query Language

Relational databases use:

> SQL (Structured Query Language)

---

## Non-Relational Databases (NoSQL)

### Definition

- Do NOT enforce strict schema
- Flexible data storage

---

### Key Difference

| Relational | Non-Relational |
|----------|--------------|
| Fixed schema | Flexible schema |
| Tables | Collections |
| Rows | Documents |

---

### MongoDB Terminology

| Relational | MongoDB |
|----------|---------|
| Table | Collection |
| Row | Document |

---

### Key Characteristics

#### 1. Flexible Schema

- No predefined structure
- Each document can differ

Example:
Document 1:
```
{ name: "A", age: 20 }
```

Document 2:
```
{ name: "B", city: "Delhi" }
```

---

#### 2. Dynamic Data

- Can store any JSON-like data
- No strict validation at DB level

---

### Advantages

- Fast development
- Flexible structure
- Good for unstructured data

---

### Disadvantages

- Weak data integrity
- No strict constraints
- Can lead to inconsistent data

---

## Real-World Use Cases

---

### Relational DB Use Case: CRM

CRM (Customer Relationship Management):

Data:
- Customers
- Orders
- Payments
- Relationships between them

Needs:
- Accuracy
- Consistency
- Relationships

➡️ Best fit: Relational DB (PostgreSQL)

---

### Non-Relational Use Case: CMS

CMS (Content Management System):

Data:
- Articles
- Images
- Videos
- Mixed formats

Example:
- Blog post may contain:
  - text
  - images
  - embeds

Structure is unpredictable

Best fit: MongoDB

---

## Tradeoff Summary

| Feature | Relational | Non-Relational |
|--------|-----------|--------------|
| Schema | Strict | Flexible |
| Integrity | Strong | Weak |
| Flexibility | Low | High |
| Complexity | Higher | Lower |

---

## Important Insight

Non-relational databases shift responsibility:

From:
- Database

To:
- Application code

---

### Why This Matters

Since schema is not enforced:

- You must validate data manually
- More bugs possible
- More maintenance effort

---

## Decision Problem

We now have many options:

Relational:
- MySQL
- PostgreSQL
- SQLite

Non-relational:
- MongoDB

---

## Question

Which database should we choose?

---

## Why PostgreSQL is Preferred

### 1. Open Source

- Free
- No licensing issues
- Widely supported

---

### 2. SQL Standard Compliance

- Follows SQL standards
- Easy migration between databases

Example:
- PostgreSQL → MySQL migration easier

---

### 3. Extensibility

- Supports extensions
- Highly customizable

---

### 4. Reliability & Scalability

- Production-ready
- Used by large systems

---

### 5. JSON Support (VERY IMPORTANT)

PostgreSQL supports:
- JSON
- JSONB (optimized)

---

### Why This Matters

You get:
- Relational + NoSQL benefits

Example:
- Store structured data → tables
- Store dynamic data → JSON

---

## Key Insight

You DO NOT need MongoDB just for flexibility.

PostgreSQL can handle:
- Structured data
- Semi-structured data

---

## Final Recommendation

Use PostgreSQL for:

- Most applications
- Startups
- Production systems

---

## Important Note

Performance differences between DBs:
- Only matter at huge scale
- Not relevant for most applications

---

## Introduction

Before designing databases, understanding **data types** is critical because:

- Defines how data is stored
- Impacts performance
- Ensures correctness
- Affects future scalability

---

## Example: Create Table

```
CREATE TABLE data_types_demo (
  id SERIAL,
  small_int_col SMALLINT,
  int_col INTEGER,
  big_int_col BIGINT,
  decimal_col DECIMAL(10,2),
  float_col REAL,
  double_col DOUBLE PRECISION,
  char_col CHAR(10),
  varchar_col VARCHAR(255),
  text_col TEXT,
  bool_col BOOLEAN,
  date_col DATE,
  time_col TIME,
  timestamp_col TIMESTAMP,
  timestamptz_col TIMESTAMPTZ,
  interval_col INTERVAL,
  uuid_col UUID,
  json_col JSON,
  jsonb_col JSONB,
  array_col INTEGER[]
);
```

---

## 1. SERIAL (Auto Increment)

### What is SERIAL?

- Integer that auto-increments
- Used for IDs

### Behavior:
- First row → 1
- Next → 2
- Next → 3 

---

### Types:
- SERIAL
- BIGSERIAL (larger range)

---

### Use Case:
Primary keys

---

## 2. Integer Types

| Type | Size | Use |
|-----|------|----|
| SMALLINT | small | small numbers |
| INTEGER | medium | default |
| BIGINT | large | very large numbers |

---

### Key Insight

Choose based on:
- Expected range of values

---

## 3. DECIMAL / NUMERIC

```
DECIMAL(10,2)
```

### Meaning:

- Total digits = 10
- Digits after decimal = 2

Example:
```
12345678.90
```

---

### Important Property

- Exact precision
- No rounding errors

---

## 4. FLOAT / DOUBLE (Floating Point)

### Types:
- REAL
- DOUBLE PRECISION

---

### Key Difference from DECIMAL

| Feature | DECIMAL | FLOAT |
|--------|--------|------|
| Accuracy | Exact | Approximate |
| Speed | Slower | Faster |

---

### Rule of Thumb

#### Use DECIMAL when:
- Accuracy matters
- Example:
  - Price
  - Money

---

#### Use FLOAT when:
- Small inaccuracies acceptable
- Example:
  - Measurements
  - Scientific data

---

### Important Insight

Floating point values:
- Can vary slightly across systems
- Not reliable for financial data

---

## 5. String Types

### Types:
- CHAR(n)
- VARCHAR(n)
- TEXT

---

### CHAR(n)

```
CHAR(10)
```

- Fixed length
- Pads spaces

Example:
```
"AB" → "AB        "
```

---

### VARCHAR(n)

```
VARCHAR(255)
```

- Variable length
- Max = 255
- No padding

---

### TEXT

- No length limit (practically huge)
- Most flexible

---

### Recommendation

- Avoid CHAR
- Prefer TEXT

---

### Important Insight

- VARCHAR(255) is often meaningless in PostgreSQL
- It’s a leftover habit from MySQL

---

### Best Practice

Use:
```
TEXT
```

And enforce limits in:
- Application layer

---

### Why?

- Avoid unnecessary migrations
- Simpler schema
- Cleaner code

---

## 6. BOOLEAN

- TRUE / FALSE

---

## 7. Date & Time Types

### DATE
- Only date

---

### TIME
- Only time

---

### TIMESTAMP
- Date + time

---

### TIMESTAMPTZ

- Timestamp + timezone

---

### Best Practice

Use:
```
TIMESTAMPTZ
```

---

## 8. INTERVAL

Represents duration

Examples:
- 10 days
- 2 hours
- 1 week

---

## 9. UUID

- Universally unique identifier

Example:
```
550e8400-e29b-41d4-a716-446655440000
```

---

### Why use UUID?

- Unique across systems
- Hard to guess
- Good for distributed systems

---

## 10. JSON vs JSONB

### JSON

- Stored as text
- Slower operations

---

### JSONB

- Binary format
- Faster
- Indexable

---

### Recommendation

Always use:
```
JSONB
```

---

## 11. Arrays

Example:
```
INTEGER[]
```

Store:
- List of values

---

## 12. Other Types

- Network addresses
- MAC addresses
- Geometric data
- XML

(Not commonly used in backend apps)

---

## INSERT Example

```
INSERT INTO table_name (...) VALUES (...);
```

Values must match:
- Order
- Data types

---

## Key Takeaways

- Choose types carefully
- Impacts:
  - Performance
  - Accuracy
  - Future flexibility

---

### Golden Rules

- Use BIGSERIAL / UUID for IDs
- Use TEXT for strings
- Use DECIMAL for money
- Use JSONB for dynamic data
- Use TIMESTAMPTZ for time

---

## End of Part 3

# Databases — Complete Notes (Part 4: Migrations & Schema Design)

## Introduction

Now that we understand:
- What databases are
- Types of databases
- Data types

We move to:
> How databases are actually used in real backend systems

---

## What is Schema?

### Definition

Schema is:
- The structure of the database
- Defines:
  - Tables
  - Columns
  - Data types
  - Constraints

---

### Example Schema

```
users table:
- id
- name
- email
- created_at
```

---

## Important Insight

Schema is the **source of truth** for:
- Data structure
- Relationships

---

## What are Migrations?

### Definition

Migrations are:
> Version-controlled changes to database schema

---

## Why Migrations Are Needed

Problem:
- Database structure changes over time

Examples:
- Add new column
- Modify data type
- Add new table

---

### Without Migrations

- Manual changes
- No history
- Hard to track changes
- Difficult collaboration

---

### With Migrations

- Changes are tracked
- Version controlled
- Repeatable
- Safe

---

## Migration Example

### Add Column

```
ALTER TABLE users ADD COLUMN age INTEGER;
```

---

## Migration Workflow

### Step 1: Create Migration

- Define change

---

### Step 2: Apply Migration

- Run migration on DB

---

### Step 3: Store Version

- Track applied migrations

---

## Key Concept: Versioning

Each migration:
- Has an ID
- Applied sequentially

---

## Benefits

- Team collaboration
- Rollback support
- Consistency across environments

---

## Rollbacks

### Definition

Reverting a migration

Example:
- Remove added column

---

## Why Important

- Fix mistakes
- Recover from issues

---

## Real Backend Workflow

---

### Step 1: Start from UI

Example:
- Figma design

---

### Step 2: Identify Entities

Extract nouns:

Example:
- Users
- Projects
- Tasks

---

### Step 3: Design Schema

Create tables:
- Define columns
- Choose data types

---

### Step 4: Define Relationships

Example:
- user_id in projects
- project_id in tasks

---

### Step 5: Write Migrations

- Create tables
- Add constraints

---

### Step 6: Run Migrations

- Apply to database

---

### Step 7: Build Backend

- Use schema in:
  - Services
  - APIs

---

## Constraints

Used to enforce rules

---

### Types

#### 1. PRIMARY KEY

- Unique identifier
- Cannot be NULL

---

#### 2. FOREIGN KEY

- Links tables
- Enforces relationships

---

#### 3. NOT NULL

- Field must have value

---

#### 4. UNIQUE

- No duplicate values

---

#### 5. CHECK

- Custom validation

Example:
```
age > 0
```

---

## Indexes (High-Level)

### Purpose

- Improve query performance

---

### How It Works

- Creates optimized lookup structure

---

### Tradeoff

| Benefit | Cost |
|--------|-----|
| Faster reads | Slower writes |

---

## Important Insight

Do NOT overuse indexes.

---

## Schema Design Principles

---

### 1. Keep It Simple

- Avoid over-engineering
- Start minimal

---

### 2. Normalize Data

- Avoid duplication
- Use relationships

---

### 3. Use Proper Data Types

- Impacts performance & accuracy

---

### 4. Plan for Growth

- Think long-term
- Avoid frequent migrations

---

## Real-World Example

Project Management System:

---

### Tables

#### Users
- id
- name
- email

---

#### Projects
- id
- name
- user_id

---

#### Tasks
- id
- title
- project_id

---

### Relationships

- User → Projects (1 to many)
- Project → Tasks (1 to many)

---

## Final Workflow Summary

1. UI → requirements  
2. Extract entities  
3. Design schema  
4. Define relationships  
5. Write migrations  
6. Apply migrations  
7. Build APIs  

---

## Final Understanding

Database design is not just about storage.

It is about:
- Structure
- Relationships
- Integrity
- Scalability

---

## End of Part 4

# Databases — Complete Notes (Part 4: Migrations & Schema Design)

## Introduction

Now that we understand:
- What databases are
- Types of databases
- Data types

We move to:
> How databases are actually used in real backend systems

---

## What is Schema?

### Definition

Schema is:
- The structure of the database
- Defines:
  - Tables
  - Columns
  - Data types
  - Constraints

---

### Example Schema

```
users table:
- id
- name
- email
- created_at
```

---

## Important Insight

Schema is the **source of truth** for:
- Data structure
- Relationships

---

## What are Migrations?

### Definition

Migrations are:
> Version-controlled changes to database schema

---

## Why Migrations Are Needed

Problem:
- Database structure changes over time

Examples:
- Add new column
- Modify data type
- Add new table

---

### Without Migrations

- Manual changes
- No history
- Hard to track changes
- Difficult collaboration

---

### With Migrations

- Changes are tracked
- Version controlled
- Repeatable
- Safe

---

## Migration Example

### Add Column

```
ALTER TABLE users ADD COLUMN age INTEGER;
```

---

## Migration Workflow

### Step 1: Create Migration

- Define change

---

### Step 2: Apply Migration

- Run migration on DB

---

### Step 3: Store Version

- Track applied migrations

---

## Key Concept: Versioning

Each migration:
- Has an ID
- Applied sequentially

---

## Benefits

- Team collaboration
- Rollback support
- Consistency across environments

---

## Rollbacks

### Definition

Reverting a migration

Example:
- Remove added column

---

## Why Important

- Fix mistakes
- Recover from issues

---

## Real Backend Workflow

---

### Step 1: Start from UI

Example:
- Figma design

---

### Step 2: Identify Entities

Extract nouns:

Example:
- Users
- Projects
- Tasks

---

### Step 3: Design Schema

Create tables:
- Define columns
- Choose data types

---

### Step 4: Define Relationships

Example:
- user_id in projects
- project_id in tasks

---

### Step 5: Write Migrations

- Create tables
- Add constraints

---

### Step 6: Run Migrations

- Apply to database

---

### Step 7: Build Backend

- Use schema in:
  - Services
  - APIs

---

## Constraints

Used to enforce rules

---

### Types

#### 1. PRIMARY KEY

- Unique identifier
- Cannot be NULL

---

#### 2. FOREIGN KEY

- Links tables
- Enforces relationships

---

#### 3. NOT NULL

- Field must have value

---

#### 4. UNIQUE

- No duplicate values

---

#### 5. CHECK

- Custom validation

Example:
```
age > 0
```

---

## Indexes (High-Level)

### Purpose

- Improve query performance

---

### How It Works

- Creates optimized lookup structure

---

### Tradeoff

| Benefit | Cost |
|--------|-----|
| Faster reads | Slower writes |

---

## Important Insight

Do NOT overuse indexes.

---

## Schema Design Principles

---

### 1. Keep It Simple

- Avoid over-engineering
- Start minimal

---

### 2. Normalize Data

- Avoid duplication
- Use relationships

---

### 3. Use Proper Data Types

- Impacts performance & accuracy

---

### 4. Plan for Growth

- Think long-term
- Avoid frequent migrations

---

## Real-World Example

Project Management System:

---

### Tables

#### Users
- id
- name
- email

---

#### Projects
- id
- name
- user_id

---

#### Tasks
- id
- title
- project_id

---

### Relationships

- User → Projects (1 to many)
- Project → Tasks (1 to many)

---

## Final Workflow Summary

1. UI → requirements  
2. Extract entities  
3. Design schema  
4. Define relationships  
5. Write migrations  
6. Apply migrations  
7. Build APIs  

---

## Final Understanding

Database design is not just about storage.

It is about:
- Structure
- Relationships
- Integrity
- Scalability

---

## End of Part 4

# END OF COMPLETE DATABASE NOTES
