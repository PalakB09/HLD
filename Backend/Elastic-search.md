# Full Text Search & Elasticsearch

## Scenario: Year 2005 — The Problem Begins

Consider the year **2005**. You are a software engineer at a rapidly growing e-commerce company during the dot-com era. Your objective is to build a search API for approximately 5,000 products.

### Basic SQL Query

Initially, the implementation utilizes a standard `LIKE` pattern:

```sql
SELECT * FROM products
WHERE name ILIKE '%laptop%' 
   OR description ILIKE '%laptop%';
```

**Syntax Details:**
- `%` : Matches any character sequence before or after the term.
- `ILIKE` : Performs a case-insensitive search (specific to PostgreSQL).

**Initial Performance:**
- **Efficiency:** Fast (~50ms latency).
- **Relevance:** Results are acceptable given the small dataset size.

---

## The Scaling Problem

As the organization scales, the datasets grow significantly:
- **Product Volume:** Increases to millions of records.
- **Latency:** Query times rise to **30 seconds or more**.
- **User Satisfaction:** Decreases due to slow response times and poor search relevance.

### New Requirements
1. **Low Latency:** Sub-second search response at scale.
2. **Relevance Ranking:** Results ordered by importance.
3. **Typo Tolerance:** Ability to handle fuzzy matching.

> **Example:**
> - **Search Term:** `laptop`
> - **Expected Result:** *MacBook Pro* (Highly relevant)
> - **Avoid:** *Laptop bag* appearing as the primary result.

---

## Database Analogy: The Librarian

A relational database can be compared to a **librarian** searching for specific information.

### Operational Workflow
1. The librarian must inspect every book individually.
2. They examine the **Title**, **Description**, and **Content** in a sequential manner.

### Limitations
- **Inefficiency:** Full scans are required for every request.
- **Lack of Ranking:** Results are typically returned by insertion order rather than relevance.

---

## Key Idea: Inverted Index

The core optimization involves transitioning from searching within documents to searching for words that point to documents.

### Traditional Approach
- Systematically scan all documents to locate a specific keyword.

### Inverted Index Approach
1. **Data Preprocessing:** Analyze and tokenize the data.
2. **Mapping Creation:**
   - `machine` → `[document_1, document_2, document_3]`
   - `learning` → `[document_1, document_4, document_5]`
<img width="622" height="163" alt="image" src="https://github.com/user-attachments/assets/45d8c7c7-3dad-42e3-ba8d-8b54075feb08" />

### Definition
An inverted index stores a mapping of **Words to Documents**, rather than Documents to Words.

### Advantages
- **Lookup Speed:** Direct access to word lists eliminates the need for full scans.
- **Relevance Ranking:** Allows for scoring based on:
    - Term frequency.
    - Word position.
    - Field importance.

---

## Relevance Scoring (BM25)

The **BM25 Algorithm** is the standard for ranking search results based on the following factors:

1. **Term Frequency (TF):** The number of times a term appears in a specific document.
2. **Document Frequency (DF):** How common a term is across the entire corpus.
3. **Document Length:** Normalization to prioritize matches in shorter documents.
4. **Field Boosting:** Assigning higher weight to matches in the `Title` field compared to the `Description` field.

---

## Tools: Elasticsearch

Built on top of **Apache Lucene**, Elasticsearch implements an inverted index to provide:
- High-performance search at scale.
- Advanced relevance scoring algorithms.
- **Typo Tolerance:** (e.g., Mapping the input `treading` to the intended `trending`).
- eg searching logs: elastic stack
---

## Demo Setup: Performance Benchmarking

A comparison was conducted using a dataset of 50,000 reviews.

### Data Models

**PostgreSQL Schema:**
```sql
CREATE TABLE reviews (
  id SERIAL,
  review TEXT,
  sentiment TEXT
);
```

**Elasticsearch Mapping:**
```json
{
  "mappings": {
    "properties": {
      "review": { "type": "text" },
      "sentiment": { "type": "keyword" }
    }
  }
}
```

### Data Ingestion
- **PostgreSQL:** Batch insertion of 1,000 records per transaction.
- **Elasticsearch:** Bulk API ingestion of 50,000 documents in a single request.

### Search Implementation
- **PostgreSQL:** `SELECT * FROM reviews WHERE review ILIKE '%searchTerm%';`
- **Elasticsearch Query:**
```json
{
  "query": {
    "query_string": {
      "query": "*searchTerm*"
    }
  }
}
```

---

## Performance Comparison

| Query | Elasticsearch | PostgreSQL |
| :--- | :--- | :--- |
| `laptop` | **~1.0 sec** | ~3.0–4.0 sec |
| `something` | **~0.5 sec** | ~7.0 sec |

### Key Observations
- Elasticsearch demonstrates significantly lower latency.
- Both systems return identical counts, but Elasticsearch provides superior horizontal scalability.

---

## Use Case Analysis

| Scenario | Recommended Solution |
| :--- | :--- |
| **Small dataset, simple pattern matching** | PostgreSQL |
| **Large-scale dataset, relevance ranking** | Elasticsearch |
| **Fuzzy search / Autocomplete** | Elasticsearch |

---

## The ELK Stack

The ELK Stack consists of three primary components:
- **Elasticsearch:** Distributed search and analytics engine.
- **Logstash:** Server-side data processing pipeline for ingestion.
- **Kibana:** Analysis and visualization platform.

**Common Applications:**
- Log management and analysis.
- Real-time business analytics.
- Infrastructure monitoring.

---

## Final Summary

- **SQL Search:** Characterized by full table scans and lack of relevance ranking.
- **Inverted Index:** Enables efficient lookups and document-centric scoring.
- **Elasticsearch:** A robust, production-ready solution for complex search requirements.
