# BIA601 - Smart Algorithms S25

Web application for recommendation optimization in e-commerce using a **multi-criteria Genetic Algorithm (GA)** on the assignment dataset:

- `data/users.xlsx`
- `data/products.xlsx`
- `data/ratings.xlsx`
- `data/behavior_15500.xlsx` (or `behavior.xlsx`)

## 1) Run

```bash
npm install
npm start
```

Open: `http://localhost:3000`

## 2) Evaluate Model Quality

```bash
npm run evaluate
```

Optional sample size:

```bash
npm run evaluate -- 200
```

## 3) What Changed

- The project reference paper was replaced.
- The recommendation engine was redesigned to follow a **hybrid multi-criteria optimization** flow:
  - Build candidate products per user.
  - Represent recommendation-criteria weights as a GA chromosome.
  - Optimize weights by GA (selection, crossover, mutation).
  - Re-rank products with optimized weights.
  - Compare baseline vs optimized quality.

## 4) API

- `GET /api/recommendations/:userId`

Returns:

- user profile signals
- baseline recommendations
- optimized recommendations
- baseline and optimized objective scores
- learned criteria weights
- fitness metrics and uplift %

## 5) Reference Paper (2024-2026 requirement)

A. Esteban, A. Zafra, C. Romero (2024).  
**Helping university students to choose elective courses by using a hybrid multi-criteria recommendation system with genetic optimization**  
arXiv:2402.08371  
DOI: https://doi.org/10.48550/arXiv.2402.08371

## 6) Notes for Submission

- Team size must be between **5 and 7** members.
- Keep all work on Git with commit history.
- Deadline: **May 5, 2026**.

## 7) Deploy on Render

- This repo includes:
  - `Dockerfile`
  - `render.yaml`
- Render will deploy as a Docker Web Service and use:
  - `PORT` environment variable
  - health check endpoint: `/health`

