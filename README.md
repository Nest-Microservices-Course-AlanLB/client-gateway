<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1 align="center">NestJS Microservices Project</h1>
  <p align="center">A microservices architecture using NestJS with NATS messaging system</p>
</p>

---

## Getting Started

Follow these steps to set up the development environment:

### Prerequisites

- Node.js installed (v16+ recommended)
- Docker installed (for NATS)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone [REPOSITORY_URL]
```
2. **Install dependencies**
```
npm install
```
3. **Configure environment variables**
- Copy .env.template to .env
- Fill in the required variables

4. **Start NATS server using Docker**
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. **Launch microservices (Products and Orders)**

6. **Run the project**
```
npm run start:dev
```

## Access
Microservices will be available on ports 3000 (client gateway)
NATS dashboard: http://localhost:8222