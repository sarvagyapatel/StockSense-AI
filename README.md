# SockSenseAI – AI-Powered Stock Insight Platform

SockSenseAI is a full-stack web application built with **Next.js (App Router)** that helps users track stocks, read relevant financial news, and generate AI-powered insights for better understanding of market sentiment and risks.  

---

## Overview

The goal of this project is to build a production-oriented stock advisory platform where users can:

- Create an account and securely authenticate
- Search for stocks using live market data
- Maintain a personal watchlist
- View real-time stock quotes
- Read curated news related to specific stocks
- Generate AI-based analytical insights (sentiment, risks, opportunities)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- React
- shadcn/ui
- Tailwind CSS
- React Hook Form
- Zod
- Client-side data fetching with custom hooks

### Backend
- Next.js API routes
- MongoDB Atlas
- Mongoose
- JWT Authentication (HTTP-only cookies)
- Alpha Vantage API for stock data and news
- Free LLM models for AI insights

---

## Core Features

### Authentication
- User registration with username availability check
- Secure login with JWT stored in HTTP-only cookies
- Logout with cookie invalidation
- Centralized authentication using middleware

### Stock Search
- Search stocks using Alpha Vantage symbol search API
- Display multiple matching tickers with metadata

### Watchlist Management
- Add stocks to personal watchlist
- Remove stocks from watchlist
- Fetch user-specific watchlist data
- Protected routes (only authenticated users can access)

### Stock Data
- Fetch real-time stock quotes
- Display open, high, low, price, change, volume, and trading day

### News Aggregation
- Fetch latest news related to a specific stock
- Display sentiment labels and summaries

### AI Insights
- Generate AI-based qualitative analysis for a stock
- Includes:
  - Overall sentiment
  - Key risks
  - Potential opportunities
  - Short-term vs long-term outlook
- Uses free LLM models to analyze structured stock and news data
- Does not provide direct buy/sell recommendations

---

## API Overview

### Authentication
- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/check-username`

### Stocks
- `GET /api/stocks/search?query=INFY`
- `GET /api/stocks/[symbol]/quotes`
- `GET /api/stocks/[symbol]/news`
- `POST /api/stocks/[symbol]/insights`

### Watchlist
- `POST /api/watchlist/add`
- `GET /api/watchlist/get`
- `DELETE /api/watchlist/delete/[symbol]`

All protected routes are secured using middleware that validates JWT tokens from cookies.

---

## Security Considerations

- Passwords are hashed before storage
- JWT tokens are stored in HTTP-only cookies
- Middleware protects sensitive routes
- Environment variables used for all secrets
- Input validation on both client and server
- No direct exposure of third-party API keys to the client

---

## Testing Strategy (Planned)

At this stage, the focus is on core functionality and architecture.  
Testing can be added incrementally without refactoring the core logic.

### Unit Testing (Planned)
- Utility functions
- API response transformers
- Validation logic

### Integration Testing (Planned)
- Auth flow (register → login → protected routes)
- Watchlist CRUD operations

### End-to-End Testing (Planned)
- User journey: login → search stock → add to watchlist → view insights
- Tools like Playwright or Cypress can be integrated later

The project is structured in a way that allows testing to be added easily.

---

## Real-World Considerations

- External API rate limits are handled gracefully
- Errors from Alpha Vantage or AI services are surfaced with meaningful messages
- UI degrades gracefully when data is unavailable
- Clear disclaimer that the platform is for informational purposes only

---

## Disclaimer

This application is for educational and informational purposes only.  
It does not provide financial, investment, or trading advice.

---

## Deployment

- Can be deployed on Vercel
- MongoDB Atlas for database hosting
- Environment variables configured via deployment platform
- CI/CD supported through GitHub and Vercel integration

---

## Author

Built by **Sarvagya Patel**

- GitHub: https://github.com/sarvagyapatel
- LinkedIn: https://www.linkedin.com/in/sarvagya-patel-b0575918b/

---

## Future Enhancements

- Historical price charts
- Alert system for price thresholds
- Portfolio analytics
- Admin dashboard
- Full automated test coverage

---