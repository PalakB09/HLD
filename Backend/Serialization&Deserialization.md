## Serialization and Deserialization

## 1. Introduction

- We have:
  - Client (browser / frontend)
  - Server (backend running locally or on cloud like AWS, GCP, Azure)

- Communication happens via:
  - HTTP (most common)
  - gRPC
  - WebSockets

---

## 2. Problem Statement

Client and server are:

- Written in different languages  
  - Client → JavaScript  
  - Server → Rust (example)

- Have different:
  - Data types  
  - Memory models  
  - structures  

---

## Key Question

How does data sent from one system get understood by another system?

---

## 3. Example Problem

Client sends:

```json
{
  "name": "some string"
}
```

Server (Rust) receives it.

Problem:
- JS is dynamic and not compiled
- Rust is strictly typed and compiled language

-> How does Rust understand JS object?

---

## 4. Solution: Common Standard

To solve this:

- Define a **common format or standards** 
- Both client and server agree on it and it becomes language agnostics

---

## Definition

Serialization = converting data into a common format  
Deserialization = converting data back into native format  

---

## Flow

Client (JS object)
→ Convert to standard format
→ Send over network
→ Server receives
→ Convert into server-native format (Rust struct)

---

## Reverse Flow

Server (Rust struct)
→ Convert to standard format
→ Send response
→ Client receives
→ Convert to JS object

---

## 5. OSI Model (High-Level Context)

- Data passes through layers:
  - Application layer
  - Transport layer
  - Network layer
  - Physical layer

---

## Important Note

As a backend engineer:

- You only care about:
  → Application layer (JSON)

- You DO NOT care about:
  - IP packets
  - frames
  - binary transmission

---

## Mental Model

Client → JSON → Network → JSON → Server

---

## 6. Serialization Definition

Serialization =  
Converting data to a standard format for transmission or storage  

Deserialization =  
Converting it back to usable format  

---

## Purpose

- Language agnostic communication  
- System interoperability  
- Data exchange across machines  

---

## 7. Serialization Standards

There are multiple formats:

---

### Text-Based Formats

- JSON (most common)
- XML
- YAML

---

### Binary Formats

- Protocol Buffers (Protobuf)
- Apache Avro (example)- object container file format in kafka

---

## Focus

We use **JSON** (used ~80% of time in HTTP APIs)

---

## 8. JSON (JavaScript Object Notation)

## Definition

- Text-based format
- Human readable
- Language independent

---

## Structure

```json
{
  "key": "value"
}
```

---

## Rules

1. Starts with `{` and ends with `}`
2. Keys must:
   - Be strings
   - Be inside double quotes
3. Values can be:
   - String
   - Number
   - Boolean
   - Array
   - Object (nested)

---

## Example

```json
{
  "name": "John",
  "age": 25,
  "isActive": true,
  "skills": ["js", "node"],
  "address": {
    "country": "India",
    "phone": 123456
  }
}
```

---

## Key Points

- JSON is human-readable  
- Supports nested structures  
- Very widely used  

---

## 9. JSON in Client-Server Communication

### Request Example

```json
{
  "id": 1,
  "title": "Book",
  "author": "Someone"
}
```

---

### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "title": "Book",
      "author": "Someone"
    }
  ]
}
```

---

## Flow

1. Client sends JSON  
2. Server parses JSON  
3. Server processes data  
4. Server sends JSON response  
5. Client parses and uses data  

---

## 10. Clarification

Internally:

- Data becomes:
  - packets
  - frames
  - binary bits (0/1)

BUT

- You only deal with JSON

---

## 11. End-to-End Flow

Client:
- Creates JS object  
- Serializes → JSON  

Network:
- Converts to binary  
- Transfers  

Server:
- Converts back → JSON  
- Deserializes → native object  

---

## 12. Final 

Serialization and Deserialization:

- Convert data to a standard format  
- Allow communication across:
  - Languages
  - Systems
  - Environments  
- A transformation process  
- A communication enabler  
- A standardization mechanism  

It ensures:

Different systems can understand the same data.
