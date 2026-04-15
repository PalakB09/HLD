# Background Jobs / Background Tasks 

## What are Background Tasks

A background task is any piece of code that runs outside of the request-response lifecycle. 

- Request → Response (client-server interaction)
- Anything outside this flow = background task

This means:
- It does not need to happen immediately
- It is not mission-critical to respond instantly
- It is asynchronous
- It can be offloaded to a separate process

---

## Why Do We Need Background Tasks

### Example: User Signup Flow

1. User signs up (email, password, etc.)
2. Backend validates data
3. Backend needs to send a verification email

### Problem (Synchronous Approach)

- Sending email involves calling a third-party service
- That service may:
  - be slow
  - be down
  - fail

### Issues

1. If error not handled:
   - Entire signup API fails

2. If error handled:
   - Signup succeeds
   - But email may not be sent
   - User is told email is sent → bad experience

---

## Solution: Background Tasks

### New Flow

1. User signs up
2. Backend processes request
3. Instead of sending email:
   - Create task
   - Serialize data (JSON)
   - Push to queue
4. Return response immediately (200 / 201)

User sees:
- "Verification email sent"

---

## Task Processing (Worker Side)

1. Worker (consumer) picks task from queue
2. Deserializes data
3. Executes logic (send email)
4. Calls external email API

---

## Failure Handling

If task fails:

- It is retried automatically
- Retry mechanism uses exponential backoff:
  - 1 min → 2 min → 4 min → 8 min

Most failures recover quickly because:
- External services usually recover in seconds

---

## Benefits

- Faster API response
- No blocking
- Retry mechanisms
- Better user experience
- Fault tolerance

---

## Summary

Background tasks allow:

- Offloading time-consuming work
- Preventing API blocking
- Avoiding timeouts
- Improving responsiveness

---

## Common Use Cases

### 1. Sending Emails

- Verification emails
- Welcome emails
- Password reset emails

---

### 2. Image / Video Processing

- Resize images
- Encode videos
- Optimize formats

---

### 3. Generating Reports

- Daily / weekly / monthly reports
- PDF generation
- Scheduled execution (cron jobs)

---

### 4. Push Notifications

- Backend sends request to:
  - Google (Android)
  - Apple (iOS)
- OS delivers notification

---

## Task Queue – What is it

A task queue is a system for managing and distributing background jobs.

It enables:
- Offloading tasks
- Reliable execution

---

## Core Components

### 1. Producer

- Application code
- Creates task
- Serializes data
- Pushes to queue 

---

### 2. Queue (Broker)

- Stores tasks
- Acts as buffer

Technologies:
- RabbitMQ
- Redis (Pub/Sub)
- AWS SQS

---

### 3. Consumer / Worker

- Runs in separate process
- Polls queue
- Dequeues task
- Executes task

---

## Queue Operations

- Enqueue → Add task
- Dequeue → Remove task

---

## Task Lifecycle

1. Task created (producer)
2. Task stored (queue)
3. Worker picks task
4. Task executed
5. Acknowledgement sent

---

## Acknowledgement

- If success → remove task
- If no acknowledgement:
  - Task retried
  - Or reassigned

---

## Visibility Timeout

- Time during which task is "in progress"
- If worker fails:
  - Task becomes available again
- Prevents task loss

---

## Types of Tasks

### 1. One-off Tasks

- Triggered once
- Examples:
  - Email sending
  - Notifications

---

### 2. Recurring Tasks

- Run periodically

Examples:
- Reports
- Cleanup jobs
- Deleting inactive sessions

---

### 3. Chain Tasks

- Parent-child relationship

Example (LMS platform):

1. Upload video
2. Encode video
3. Generate thumbnails
4. Process thumbnails
5. Generate subtitles

Some tasks:
- Sequential (dependent)
- Some parallel (independent)

---

### 4. Batch Tasks

- Multiple tasks triggered together

Examples:
- Delete account:
  - Delete user data
  - Delete assets
  - Delete profile

- Sending reports to thousands of users

---

## Design Considerations

### 1. Idempotency

- Task can run multiple times safely
- No side effects

---

### 2. Error Handling

- Proper try/catch
- Logging failures
- Enable retries

---

### 3. Monitoring

Track:
- Queue size
- Success count
- Failure count

Tools:
- Prometheus
- Grafana

---

### 4. Scalability

- Add more workers
- Horizontal scaling

---

### 5. Ordering

- Some tasks require strict order
- Ensure queue supports it

---

### 6. Rate Limiting

- Prevent overload of external APIs

---

## Best Practices

### 1. Keep Tasks Small

- Single responsibility
- Easier retries
- Easier debugging

---

### 2. Avoid Long-running Tasks

- Break into smaller tasks
- Use chaining

---

### 3. Proper Logging

- Helps debugging
- Helps monitoring

---

### 4. Monitor Queue and Workers

- Track health
- Set alerts
- Handle failures early

---

## Final Recap

Background tasks:

- Improve scalability
- Improve reliability
- Improve responsiveness

They help:

- Offload heavy work
- Avoid blocking APIs
- Handle failures gracefully
- Enable retries
