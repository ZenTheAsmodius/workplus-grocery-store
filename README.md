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


## Routes

**POST /login**

JSON payload example:
```json
{
  "username" : "username",
  "password" : "password"
}
```
Return json payload with **access_token**
```json
{
  "access_token": "jwt access token"
}
```

**Auth header example**
```json
"Authorization": "Bearer eyJhbGciOiJIUzI1NiI..."
```

**GET /departments**

No need for Auth headers. Returns array of departments.
You can query it by all supported model fields.


**GET /departments/:name**

No need for Auth headers. Returns one department by **name**


**GET /departments/:name/[employees | managers]**

Auth header required. Returns array of employees/managers for a single department.
If you add **descendants=true** to query it will add employees/managers from descendant departments to response array.


**GET /[employees | managers]**

Auth header required. Returns list of employees/managers.

**POST /[employees | managers]**

Auth header required. Create a single employee/manager. Payload example:
```json
{
  "username": "lepi_mica",
  "full_name": "Lepi Mica",
  "password": "password",
  "role": "Employee",
  "department": "Radnja 7"
}
```
Returns HTTP status 201 and created employee/manager/

**GET /[employees | managers]/:username**

Auth header required. Returns data for a single employee/manager.


**PUT /[employees | managers]/:username**

Auth header required. Update your employee/manager. Return **No body** and HTTP status **204**.

**DELETE /[employees | managers]/:username**

Auth header required. DELETE your employee/manager. Return **No body** and HTTP status **204**.
