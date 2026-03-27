# HTTP Protocol (Credits: 5. Understanding HTTP for backend engineers, where it all starts by Sriniously)

------------------------------------------------------------------------

# Table of Contents

1.  Introduction
2.  Core Principles of HTTP
3.  HTTP vs HTTPS
4.  Networking Foundations (TCP, OSI)
5.  Evolution of HTTP
6.  HTTP Message Structure
7.  HTTP Headers (Deep Dive)
8.  HTTP Methods
9.  Idempotency
10. CORS (Complete Flow)
11. HTTP Status Codes
12. HTTP Caching (Advanced)
13. Content Negotiation
14. HTTP Compression
15. Persistent Connections
16. Handling Large Data
17. Security (SSL/TLS Basics)
18. Real-World Insights

------------------------------------------------------------------------

# 1️⃣ Introduction

HTTP (HyperText Transfer Protocol) is the **foundation of communication
on the web**.

It enables:

-   Browser ↔ Server communication
-   API interactions
-   Data exchange across distributed systems

⚠️ Important:

-   Backend systems rely heavily on HTTP semantics
-   Understanding HTTP deeply = **strong backend fundamentals**

------------------------------------------------------------------------

# 2️⃣ Core Principles of HTTP

## 2.1 Statelessness

HTTP is **stateless**, meaning:

-   Server does NOT remember previous requests
-   Every request is independent

### 🔍 What this implies

Each request must include:

-   Authentication (JWT, cookies)
-   Context (headers, params)
-   Required data

### 🔁 Example

GET /profile\
Authorization: Bearer `<token>`{=html}

If token not sent → server cannot identify user.

------------------------------------------------------------------------

## 2.2 Advantages of Statelessness

### ✅ Simplicity

-   No need to store session state

### ✅ Scalability

-   Any server can handle any request

### ✅ Fault tolerance

-   No recovery of session required

------------------------------------------------------------------------

## 2.3 Problems & Solutions

  Problem          Solution
  ---------------- -----------------
  No memory        Cookies
  User sessions    Session storage
  Authentication   JWT tokens

------------------------------------------------------------------------

## 2.4 Client-Server Model

### Client

-   Initiates request
-   Example: Browser, mobile app

### Server

-   Processes request
-   Returns response

### 🔥 Key Rule

Server NEVER initiates communication (in HTTP)

------------------------------------------------------------------------

# 3️⃣ HTTP vs HTTPS

  Feature      HTTP   HTTPS
  ------------ ------ -------
  Security     ❌     ✅
  Encryption   ❌     TLS
  Port         80     443

HTTPS adds:

-   TLS encryption
-   Certificates
-   Data integrity

------------------------------------------------------------------------

# 4️⃣ Networking Foundations

## 4.1 TCP

HTTP uses **TCP** because:

-   Reliable
-   Ordered delivery
-   Error detection

------------------------------------------------------------------------

## 4.2 TCP Handshake (3-way)

1.  SYN
2.  SYN-ACK
3.  ACK

------------------------------------------------------------------------

## 4.3 OSI Model (Relevant Layers)

  Layer             Role
  ----------------- ------
  7 (Application)   HTTP
  4 (Transport)     TCP
  3 (Network)       IP

Backend devs mainly care about: 👉 **Layer 7 (HTTP)**

------------------------------------------------------------------------

# 5️⃣ Evolution of HTTP

## HTTP/1.0

-   One request → one connection ❌

## HTTP/1.1

-   Persistent connections ✅
-   Keep-alive

## HTTP/2

-   Multiplexing
-   Binary protocol
-   Header compression

## HTTP/3

-   Uses QUIC (UDP)
-   Faster connections
-   Better performance

------------------------------------------------------------------------

# 6️⃣ HTTP Message Structure

## 6.1 Request

GET /users HTTP/1.1\
Host: example.com (frontend domain)\
Authorization: Bearer xyz

(body)

### Components

-   Method
-   URL
-   Headers
-   Body

------------------------------------------------------------------------

## 6.2 Response

HTTP/1.1 200 OK\
Content-Type: application/json

{ "data": "value" }

------------------------------------------------------------------------

# 7️⃣ HTTP Headers (Deep Dive)

## 7.1 What are Headers?

-   Key-value metadata
-   Provide context about request/response
-   After all the headers there is always a blank line before the
    request to show that they have been sent

<img width="956" height="455" alt="image" src="https://github.com/user-attachments/assets/f0c1a1e5-a29d-4024-a33b-f1f9de3e231a" />

------------------------------------------------------------------------

## 7.2 Why Not Put Everything in Body?

Checking meta data about the package

📦 Analogy:

-   Address on parcel (header)
-   Content inside (body)

------------------------------------------------------------------------

## 7.3 Types of Headers

### 🔹 Request Headers

-   User-Agent what kind of client is that browser, server or postman
-   Authorization valid
-   Accept what kind of content json, html, test
-   Cookie

------------------------------------------------------------------------

### 🔹 Response Headers

-   Content-Type
-   Cache-Control

------------------------------------------------------------------------

### 🔹 General Headers (Used in both request and responses)

-   Connection
-   Date
-   Cache Control

------------------------------------------------------------------------

### 🔹 Representation Headers (representation of the resource being transmitted - request body or response msg

-   Content-Length
-   Content-Encoding
-   ETag identifier for caching
-   Content - Type

------------------------------------------------------------------------

### 🔹 Security Headers

-   HSTS Strict Transport Security - means communicate only on https
    preventing protocol downgrade attact
-   CSP Content security policy - Cross Sites Scripting attacks
-   X-Frame-Options prevents web page being embeddable
-   X-Content-Type-Options
-   Set Cookie so that they are inaccessible to js

------------------------------------------------------------------------

## 7.4 Advanced Concepts

### Extensibility

-   Custom headers allowed

X-App-Version: 1.2

------------------------------------------------------------------------

### Headers as Control Signals

remote control on the server side

Eg client says i want html server sends html

Headers influence:

-   Authentication
-   Caching
-   Content type
-   Behavior

------------------------------------------------------------------------

# 8️⃣ HTTP Methods

Define the intent

  Method   Use
  -------- ----------------
  GET      Read
  POST     Create
  PATCH    Partial update
  PUT      Full replace
  DELETE   Remove

------------------------------------------------------------------------

# 9️⃣ Idempotency

## Definition

Same request → same result

------------------------------------------------------------------------

## Idempotent Methods

-   GET
-   PUT
-   DELETE

------------------------------------------------------------------------

## Non-Idempotent

-   POST

Example:

POST twice → creates duplicate entries

------------------------------------------------------------------------

# 🔟 CORS (Cross-Origin Resource Sharing)

In headers if host and origin are different browser treats it as a cross
origin request

## Problem

Browser blocks cross-origin requests, blocks request to the domain
diffrent from theirs

------------------------------------------------------------------------

## Same-Origin Policy

Allowed only if:

-   Same domain
-   Same protocol
-   Same port

------------------------------------------------------------------------

## Solution → CORS

Access-Control-Allow-Origin: \*

------------------------------------------------------------------------

## 10.1 Simple Request Flow

1.  Request sent browser add the origin header
2.  Serverchecks the origin header and responds with CORS header (Access
    control)
3.  Browser allows response (it basically looks for the Access control
    allow origin heeader: www.example.com or \*)

------------------------------------------------------------------------

## 10.2 Preflight Request (OPTIONS)

options method help understand the capabilities of servers for cors

Triggered when at least one of these is satisfied:

-   eg PUT/DELETE\
-   req includes non simple headers eg auth\
-   req has content type other than application/x-www-form-urlencoded,
    multipat/form-data, or text-plain

------------------------------------------------------------------------

### Flow

1.  OPTIONS request sent

<img width="579" height="315" alt="image" src="https://github.com/user-attachments/assets/80819e3c-2983-4274-9965-ff68ac5caf0b" />

Access control request method for - do you support this method for the
reques\
request headers means whether you support this header or not\
no actual data

3.  Server responds with permissions

<img width="545" height="154" alt="image" src="https://github.com/user-attachments/assets/61b48448-d801-4c63-944f-32eea85a8877" />

max age means these will be same for these many hrs so saves b/w\
ststus code 204

5.  Browser validates\
6.  Actual request sent

------------------------------------------------------------------------

Try burpsuit for visualising

------------------------------------------------------------------------

# 11️⃣ HTTP Status Codes

## Categories

  Type   Meaning
  ------ ------------------------------
  1xx    Info (eg switching protocols
  2xx    Success
  3xx    Redirect
  4xx    Client Error
  5xx    Server Error

------------------------------------------------------------------------

## 2xx

-   200 OK
-   201 Created
-   204 No Content

------------------------------------------------------------------------

## 3xx

-   301 rsrc moved Permanently
-   302 Temporary redirect (means client shud continue to use this url
    eg for campaign but dont change permanently)
-   304 Not Modified

------------------------------------------------------------------------

## 4xx

-   400 Bad Request (invalid or illogical data)
-   401 Unauthorized
-   403 Forbidden (no permissions to access)
-   404 Not Found
-   405 Method Not Allowed
-   409 Conflict (eg duplicate folders)
-   429 Too Many Requests

------------------------------------------------------------------------

## 5xx

-   500 Internal Server Error
-   501 Not Implemented (currently not supported might be in the future)
-   502 Bad Gateway
-   503 Service Unavailable
-   504 Timeout (means ngnix didnt get response from the original server
    in that time period)

------------------------------------------------------------------------

# 12️⃣ HTTP Caching (Advanced)

copying the resposnes for reuse

## Why caching?

-   Reduce latency
-   Reduce server load
-   Save bandwidth

------------------------------------------------------------------------

## Key Headers

Cache-Control: max-age=10

------------------------------------------------------------------------

### ETag

-   Hash of response

------------------------------------------------------------------------

### Last-Modified

-   Timestamp

------------------------------------------------------------------------

## Flow

1.  First request → server returns data + ETag

2.  Next request → client sends ETag+ last modified

3.  Server:

    -   Same → 304
    -   Changed → 200

------------------------------------------------------------------------

# 13️⃣ Content Negotiation

Client tells data format preferences via headers:

Accept: application/json

Accept-Language: en

Accept-Encoding: gzip

------------------------------------------------------------------------

# 14️⃣ HTTP Compression

## Why?

Reduce size

### Example

-   26MB → 3.8MB (gzip)

------------------------------------------------------------------------

## Header

Content-Encoding: gzip

------------------------------------------------------------------------

# 15️⃣ Persistent Connections

## Problem (HTTP/1.0)

-   New connection each time

------------------------------------------------------------------------

## Solution (HTTP/1.1)

-   Keep-alive

Connection: keep-alive

------------------------------------------------------------------------

# 16️⃣ Handling Large Data

## 16.1 Multipart (Uploads)

-   Used for files
-   Data sent in chunks

Content-Type: multipart/form-data

will also have a boundary deliminator

------------------------------------------------------------------------

## 16.2 Chunked Transfer (Streaming)

Server sends:

-   Data in parts
-   Continuous stream

Content-Type: text/event-stream\
Connection: keep-alive

------------------------------------------------------------------------

# 17️⃣ Security (SSL/TLS Basics)

Provides:

-   Encryption
-   Authentication
-   Integrity

Tls is used these days and not ssl prevernts interception, establish
encrypted connection using certificates\
https uses tls which encrypts data

------------------------------------------------------------------------

# 18️⃣ Real-World Backend Insights 🚀

### 💡 1. Stateless != No State

-   State exists in:

    -   DB
    -   Redis
    -   Tokens

------------------------------------------------------------------------

### 💡 2. CORS is Browser-Enforced

-   Not server restriction
-   APIs work without browser

------------------------------------------------------------------------

### 💡 3. Status Codes = Contract

-   Clients depend on them
-   Must be consistent

------------------------------------------------------------------------

### 💡 4. Caching is Hard in Production

-   Requires:

    -   Cache invalidation
    -   Versioning

------------------------------------------------------------------------

### 💡 5. Headers = Power Layer

-   Control behavior without changing logic

------------------------------------------------------------------------
