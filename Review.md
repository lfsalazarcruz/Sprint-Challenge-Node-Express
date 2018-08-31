# Review Questions

## What is Node.js?
Node.js let you use JavaScript on the server. It is a server environment. Can directly open connections. It can perform CRUD operations.

## What is Express?
Is a framework to help organize web applications on the server side. You can manage routes, request, and views. 

## Mention two parts of Express that you learned about this week.
1. It is a middleware. 
2. express.json()

## What is Middleware?
A middlewate intercepts data. It is kind of an array of functions that gets executed in the order they are introduced into the server code.

## What is a Resource?


## What can the API return to help clients know if a request was successful?
You can return a status code with a message.
res.status(statusCode).json({ message: 'Success!' })

## How can we partition our application into sub-applications?
with can modularized the application into different modules and import the necessary files to the server.

## What is express.json() and why do we need it?
It is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
