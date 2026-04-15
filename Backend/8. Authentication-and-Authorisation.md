# Authentication & Authorization 

## Overview

Authentication is a mechanism to assign an identity to a subject.
It answers the question: Who are you?

Authorization is the mechanism to determine permissions.
It answers the question: What can you do?

Authentication happens first, then authorization.

---

## Historical Context

### Pre-Industrial Society

- Identity was implicit
- Based on recognition
- Village elder could vouch for a person
- Agreements sealed with handshake
- Based on human trust and social context

Limitations:
- Cannot scale
- Trust limited to local communities

---

### Medieval Period – Seals

- Wax seals used for authentication
- Attached to letters and agreements
- Unique patterns acted as identity

Properties:
- First authentication tokens
- Based on possession (something you have)

Problems:
- Prone to forgery
- Authentication bypass possible

Led to:
- Watermarks
- Encrypted markings / crypto

---

### Industrial Revolution – Passphrases

- Telegraph introduced
- Operators used shared secrets

Concept introduced:
- Something you know (earlier something you possess)

---

### Early Computing Era

- 1961 MIT systems introduced passwords ( working on multiple ppl can use the same computer without sharing the dataa)
- Stored in plaintext

Problem:
- Insecure storage

Solution:
- Hashing
- Secure password storage

---

### Cryptography Era (1970s)

- Diffie-Hellman introduced
- Asymmetric cryptography

Impact:
- Foundation of secure authentication
- Public-private key systems

---

### Multi-Factor Authentication

Combines:
- Something you know (password)
- Something you have (device)
- Something you are (biometrics data)

---

### Modern Era

Driven by:
- Cloud systems
- Mobile apps
- APIs

Technologies:
- OAuth
- JWT
- Zero Trust
- Passwordless systems

---

### Future

- Decentralized identity
- Behavioral biometrics
- Post-quantum cryptography

---

## Core Components

### Sessions

HTTP is stateless (isolated interaction) → sessions introduce state

Flow:
1. User logs in
2. Server creates session ID
3. Stores session in DB or Redis (in mem store storing in ram in distributed sys)
4. Sends session ID via cookie
5. Client sends cookie in every request
6. Server validates session

Properties:
- Stateful
- Server stores data

Advantages:
- Easy revocation
- Centralized control

Disadvantages:
- Memory overhead maintaining session data
- Scaling complexity
- Replication issues

---

### JWT (JSON Web Token)

Purpose:
- Solve session scalability issues
- base 64 encoded
Structure:

1. Header
   - Algorithm metadata

2. Payload
   - User data
   - Claims like sub, role, iat

3. Signature
   - Integrity verification

Properties:
- Stateless verification using key
- Self-contained

Advantages:
- No storage required
- Highly scalable
- Portable across services

Disadvantages:
- Hard to revoke
- Token theft risk (someone else takes your key and perform the tasks)

Mitigation:
- Blacklist
- Short expiry

---

### Cookies

- Stored in browser
- Sent automatically with requests

Used for:
- Session ID
- JWT

---

  ## Authentication Types

### Stateful Authentication

Flow:
- Login → session created
- Stored in DB/Redis
- Cookie holds session ID (js cannot access the value its html only)
- Server validates per request (check in redis or persistent storage)

Pros:
- Easy revocation
- Central control of all sessions so can revoke easily

Cons:
- Hard to scale
- Requires storage

---

### Stateless Authentication
secret key at server
Flow:
- Login → JWT generated
- Stored on client
- Sent in headers
- Server verifies signature

Pros:
- Scalable
- No storage

Cons:
- Hard revocation
- Security risks if leaked

---

### API Keys

- Used for machine-to-machine communication

Flow:
- Generate API key
- Send with request
- Server validates

---

### OAuth 2.0 (open authorisation)
(solved the issue of authorisation(what) and not authentication (who))
Problem:
- Password sharing
- No delegation

Solution:
- Token-based delegation

Roles:
- Resource Owner (user)
- Client (app)
- Resource Server
- Authorization Server

Flow:
1. Redirect user to auth server
2. User grants permission
3. Token issued
4. Client accesses resources

---

#### Key Characteristics

- Used **cryptographic signatures** for every request
- Required:
  - Consumer key
  - Consumer secret
  - Access token
  - Token secret
- Each request had to be **signed**

#### Problems with OAuth 1.0

- Complex to implement
- Required strict signature generation
- High developer overhead
- Difficult debugging
- Tight coupling with cryptographic logic

Because of this complexity, adoption and implementation became difficult.

---

### OAuth 2.0

OAuth 2.0 was introduced as a **simplified and more flexible version** of OAuth 1.0.

#### Key Changes

- Removed mandatory cryptographic signatures
- Introduced **Bearer Tokens**
- Focus shifted from security-in-protocol → security-in-transport (HTTPS)

---

### Bearer Tokens

- Token acts as proof of access
- Whoever has the token can use it
- Must be protected (usually via HTTPS)

Example:
```
Authorization: Bearer <access_token>
```

---

### Advantages of OAuth 2.0 over OAuth 1.0

- Much simpler implementation
- No complex signing logic
- More flexible
- Supports multiple flows
- Better suited for modern applications (mobile, web, APIs)

---

### OAuth 2.0 Flows

1. Authorization Code Flow  
   - Used for server-side applications  
   - Most secure  

2. Implicit Flow (deprecated)  
   - Used for browser-based apps  

3. Client Credentials Flow  
   - Used for server-to-server communication  

4. Device Code Flow  
   - Used for devices like TVs and IoT  

---

### Important Insight

OAuth 2.0 trades:
- **Protocol-level security (OAuth 1.0)**  
for  
- **Transport-level security (HTTPS)**

---

### OpenID Connect

- Extension of OAuth
- Adds authentication

Key:
- ID Token (JWT)

Contains:
- User identity
- Metadata

Used in:
- Google login
- Social login

---

### Decision Guide

Use:
- Stateful → web apps (used in hybrid with stateless)
- Stateless → microservices/mobile
- API keys → server-to-server
- OAuth/OIDC → third-party login

---
### Authentication vs Authorization

| Aspect | Authentication | Authorization |
|------|--------------|--------------|
| Definition | Process of verifying identity | Process of determining permissions |
| Core Question | Who are you? | What can you do? |
| Order | Happens first | Happens after authentication |
| Purpose | Identify the user | Grant or deny access |
| Based On | Credentials (password, OTP, biometrics) | Roles, permissions, policies |
| Example | Logging into an account | Accessing admin dashboard |
| Data Used | Username, password, tokens | Roles, access control lists |
| Output | Identity established | Access decision (allowed/denied) |
| Failure Result | Login fails | Access denied (403) |
| Real-World Analogy | Showing ID card | Checking what areas you can enter |

---
### Sessions vs JWT

| Feature | Sessions | JWT |
|--------|--------|-----|
| State | Stateful | Stateless |
| Storage | Server-side (DB/Redis) | Client-side |
| Scalability | Harder | Easier |
| Revocation | Easy | Difficult |
| Size | Small (session ID) | Larger (payload included) |

---

### Cookies vs Tokens

| Feature | Cookies | Tokens |
|--------|--------|--------|
| Storage | Browser-managed | Client-managed |
| Sending | Automatic | Manual (headers) |
| Usage | Sessions, JWT storage | Authorization headers |
| Security | CSRF risk | XSS risk |

---

## Security Considerations

### Common Threats

- Token theft
- Session hijacking
- Replay attacks
- CSRF (Cross-Site Request Forgery)
- XSS (Cross-Site Scripting)

---

### Best Practices

- Use HTTPS always
- Set secure cookie flags:
  - HttpOnly
  - Secure
  - SameSite
- Use short-lived tokens
- Implement refresh tokens
- Rotate keys regularly
- Use rate limiting
- Validate all inputs

---

## Token Lifecycle

### Access Token

- Short-lived
- Used for API access

---

### Refresh Token

- Long-lived
- Used to generate new access tokens

---

### Flow

1. User logs in
2. Server issues:
   - Access token
   - Refresh token
3. Client uses access token
4. When expired:
   - Uses refresh token
5. New access token issued

---

## Zero Trust Architecture

### Principle

"Never trust, always verify"

---

### Characteristics

- Every request is authenticated
- Every request is authorized
- No implicit trust (even internal systems)
- Continuous verification

---

## Real-World Architecture Insight

Modern systems often use:

- API Gateway
- Authentication Service
- Authorization Service
- Identity Provider (IdP)

---

### Example Flow

1. User logs in via IdP
2. Token issued
3. API Gateway validates token
4. Request forwarded to services
5. Services perform authorization checks

---

## OAuth 2.0 Authorization Code Flow (Complete)

This is the most secure and commonly used OAuth flow.

---

## Actors Involved

- Resource Owner → User  
- Client → Application (frontend/backend)  
- Authorization Server → Auth provider (Google, etc.)  
- Resource Server → API server  

---

## Step-by-Step Flow

### 1. User Initiates Login

Client redirects user to Authorization Server:

```
GET /authorize?
  response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=REDIRECT_URI
  &scope=profile email
  &state=RANDOM_STRING
```

### Parameters:

- response_type=code → indicates authorization code flow  
- client_id → identifies application  
- redirect_uri → where auth server will send response  
- scope → permissions requested  
- state → CSRF protection  

---

### 2. User Authenticates

- User logs in on Authorization Server
- User grants permission (consent)

---

### 3. Authorization Code Returned

Authorization Server redirects back:

```
GET /callback?
  code=AUTH_CODE
  &state=RANDOM_STRING
```

---

### Important:

- Client MUST verify:
  - state matches original request
- Prevents CSRF attacks

---

### 4. Exchange Code for Token

Client sends POST request:

```
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE
&redirect_uri=REDIRECT_URI
&client_id=CLIENT_ID
&client_secret=CLIENT_SECRET
```

---

### 5. Token Response

Server responds:

```json
{
  "access_token": "ACCESS_TOKEN",
  "refresh_token": "REFRESH_TOKEN",
  "expires_in": 3600,
  "token_type": "Bearer",
  "id_token": "JWT_IF_OIDC"
}
```

---

## Tokens Explained

### Access Token
- Used to access APIs
- Short-lived

---

### Refresh Token
- Used to get new access tokens
- Long-lived

---

### ID Token (OIDC)
- JWT containing user identity
- Used for authentication

---

## 6. Access Protected Resource

Client sends request:

```
GET /api/resource
Authorization: Bearer ACCESS_TOKEN
```

---

## 7. Token Expiry Handling

When access token expires:

```
POST /token

grant_type=refresh_token
&refresh_token=REFRESH_TOKEN
&client_id=CLIENT_ID
```

---

## Response:

```json
{
  "access_token": "NEW_ACCESS_TOKEN",
  "expires_in": 3600
}
```

---

## Security Features

### 1. State Parameter
- Prevents CSRF attacks

---

### 2. Redirect URI Validation
- Must exactly match registered URI

---

### 3. HTTPS Required
- Protects tokens from interception

---

### 4. Short-lived Access Tokens
- Limits damage if leaked

---

## PKCE (Proof Key for Code Exchange)

Used for public clients (mobile apps, SPAs)

---

### Additional Parameters:

```
code_challenge=HASH
code_challenge_method=S256
```

---

### Token Exchange Adds:

```
code_verifier=ORIGINAL_SECRET
```

---

### Purpose:

- Prevents authorization code interception attacks

---
### Remember never send user friendly msges, send msg like authentication failed, instead of incorrect passowrd
### Timing Attack
- when we give a timeout that password is incorrect, this allows aattackers to identify whether tarrget is username or pass
- password checks also take time as they are compared with hashed passwords, so there is a time gap here too

- solution 1: use constant time crypto operaations
- solution 2: use error codes like 200 and then send request so that the time left is less
