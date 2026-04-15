# Caching

## Overview

Caching is a fundamental technique used in computer systems to improve performance by reducing the time and effort required to retrieve or compute data.

**Simple Definition:**
Caching is a mechanism that reduces the time and computational effort needed to perform operations by storing frequently used data in a faster-access location.

**Technical Definition:**
Caching involves storing a subset of data from a primary data source in a faster-access storage layer, based on factors like usage frequency and probability of reuse, to optimize retrieval speed and system efficiency.

---

## Why Caching is Important

Caching is critical for high-performance systems, especially where:

- Latency requirements are in milliseconds or microseconds
- Systems handle millions of requests
- Computation or data retrieval is expensive

### Without Caching
- Repeated computations
- High server load
- Slow response time

### With Caching
- Faster responses
- Reduced computation
- Lower database load

---

## Real-World Examples

### 1. Search Engines (Google-like systems)

- Queries like "weather today" are searched millions of times
- Results are cached to avoid recomputation

**Concepts:**
- Cache Hit: Data found in cache
- Cache Miss: Data not found → compute → store → return

---

### 2. Streaming Platforms (Netflix-like systems)

Use **CDN (Content Delivery Network)**:
- locations are caalled edge locations
- Content cached at edge servers worldwide
- Users get data from nearest server

**Benefits:**
- Reduced latency
- Faster streaming
- Lower origin server load

---

### 3. Social Media (Twitter/X-like systems)

- Trending topics computed using heavy algorithms
- Results cached and refreshed periodically

---

## When to Use Caching

Use caching when:

- Data is expensive to compute
- Data is frequently accessed
- Data does not change often

---

## Types of Caching

### 1. Network-Level Caching

#### CDN (Content Delivery Network)

**Flow:**
1. User requests resource
2. DNS routes to nearest edge server (point of presence)
3. Cache check:
   - Hit → return
   - Miss → fetch → cache → return
 
**TTL (Time To Live):**
Defines how long data remains in cache.

---

#### DNS Caching
if cache miss then they go to root servers, which have the top level addresses eg for .com, .org. THey then send to Authoritative name server for example.com. They go deep and deep that this why recursive resolver. 
Layers:
- OS Cache
- Browser Cache
- ISP Resolver Cache

**Purpose:**
- Reduce DNS lookup time
- Avoid repeated resolution

---

### 2. Hardware-Level Caching

Memory hierarchy:

- CPU Cache (L1, L2, L3)
- RAM
- Disk
<img width="281" height="320" alt="image" src="https://github.com/user-attachments/assets/e9fc7f02-dac9-4d02-9d8e-e5841c93fd27" />

**Trade-offs:**

| Storage | Speed | Capacity | Persistence |
|--------|------|----------|-------------|
| CPU Cache | Very Fast | Very Small | No |
| RAM | Fast | Medium | No |
| Disk | Slow | Large | Yes |

---

### 3. Software-Level Caching

Tools:
- Redis
- Memcached

**Features:**
- In-memory storage
- Key-value model
- NoSQL structure

**Advantages:**
- Extremely fast
- Simple operations

---

## Caching Strategies

### 1. Cache Aside (Lazy Loading)

**Flow:**
1. Check cache
2. If miss → fetch from DB → store in cache
3. Return data

---

### 2. Write-Through Cache

**Flow:**
1. Write to DB
2. Write to cache simultaneously

**Pros:**
- Always consistent

**Cons:**
- Higher write overhead

---

## Cache Eviction Policies

When cache is full:

### 1. No Eviction
- Writes fail

### 2. LRU (Least Recently Used)
- Remove least recently accessed data

### 3. LFU (Least Frequently Used)
- Remove least frequently accessed data

### 4. TTL-Based
- Data expires after a fixed time

---

## Why In-Memory Caching is Fast

- Direct access via electrical signals
- No mechanical delay
- Constant-time retrieval

**Limitations:**
- Limited size
- Volatile (data lost on restart)

---

## Use Cases

### 1. Database Query Caching

- Cache results of expensive queries
- Reduces DB load

---

### 2. Session Storage

- Store user session tokens
- Faster authentication checks

---

### 3. API Response Caching

- Cache external API responses

**Example:**
- Weather APIs

**Benefits:**
- Avoid rate limits
- Reduce cost

---

### 4. Rate Limiting

**Mechanism:**
- Track requests per IP
- Store counters in cache

**Example:**
- 50 requests per minute per user

---

## Key Takeaways

- Caching improves performance and scalability
- Only a subset of data is cached
- Best for read-heavy systems
- Used across network, hardware, and software layers
- Redis is widely used for backend caching

