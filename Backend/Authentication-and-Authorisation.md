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
- Encrypted markings

---

### Industrial Revolution – Passphrases

- Telegraph introduced
- Operators used shared secrets

Concept introduced:
- Something you know

---

### Early Computing Era

- 1961 MIT systems introduced passwords
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
- Something you are (biometrics)

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

HTTP is stateless → sessions introduce state

Flow:
1. User logs in
2. Server creates session ID
3. Stores session in DB or Redis
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
- Memory overhead
- Scaling complexity
- Replication issues

---

### JWT (JSON Web Token)

Purpose:
- Solve session scalability issues

Structure:

1. Header
   - Algorithm metadata

2. Payload
   - User data
   - Claims like sub, role, iat

3. Signature
   - Integrity verification

Properties:
- Stateless
- Self-contained

Advantages:
- No storage required
- Highly scalable
- Portable across services

Disadvantages:
- Hard to revoke
- Token theft risk

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
- Cookie holds session ID
- Server validates per request

Pros:
- Easy revocation
- Central control

Cons:
- Hard to scale
- Requires storage

---

### Stateless Authentication

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

### OAuth 2.0

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

## Decision Guide

Use:
- Stateful → web apps
- Stateless → microservices/mobile
- API keys → server-to-server
- OAuth/OIDC → third-party login

---

