# TSGoat: Vulnerable TypeScript Application

# Introduction
TSGoat is an intentionally vulnerable application written in TypeScript to learn about security flaws.

# Prerequisites
* Node.js (tested on v12.18.1)

# Quick Start

Download and install dependencies
```
git clone https://github.com/jharper-sec/TSGoat.git
cd TSGoat
npm install
```

Compile TypeScript application
```
npm run tsc
```

Start application
```
npm start
```

or to start with Contrast agent
```
npm run contrast
```

Navigate to http://localhost:3000 to view the application

# Run with Docker
Build container image
```
docker-compose build
```

Run with docker-compose
```
docker-compose up
```

# Currently implemented vulnerabilities
* SQL Injection
* Reflected XSS