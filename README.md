# Node.js Microservices with RabbitMQ and PostgreSQL
This project demonstrates communication between two separate Node.js servers using RabbitMQ. The **Base Server** sends messages to RabbitMQ, and the **Log Server** consumes those messages from the queue. Optionally, the Log Server can store the messages in a PostgreSQL database.

The PostgreSQL database can run on either a local machine or Docker, but storing the data in PostgreSQL is not mandatory. The database calls are just placeholders, and you can treat the example as a dummy implementation.

## Prerequisites
- **Node.js** installed on your system
- **Docker** installed to run RabbitMQ (if needed)
- **PostgreSQL** (optional) if you want to store messages

## Project Structure
The project contains two services:

1. **Base Server**: This service receives HTTP requests and sends the request data to RabbitMQ.
2. **Log Server**: This service consumes the messages from RabbitMQ and processes them. If PostgreSQL is configured, it will log the data to a database; otherwise, it will just log to the console.
