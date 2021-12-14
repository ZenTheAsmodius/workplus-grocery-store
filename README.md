# Workplus Grocery Store

Requirements:
- MongoDB
- Node.js version 12+
- npm version 6+

&nbsp;

To install dependencies run next command in terminal:
```bash
npm install
```

We need to setup environment variables before using this service.
Environment example I used for local development are shown in **.env.example** file. Easiest way to use them is to copy this file into **.env** file with command:
```bash
cp .env.example .env
```

In order to seed database run:
```bash
npm run seed
```

In order to run tests use:
```bash
npm test
```

In order to start app server use:
```bash
npm start
```


### **Note**

This app is written as a proof of concept and lack some features like pagination, sanitization of inputs, some test cases, etc.