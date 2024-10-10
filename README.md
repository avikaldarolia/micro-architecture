# Node.js Microservices with RabbitMQ and PostgreSQL
This project demonstrates communication between two separate Node.js servers using RabbitMQ. The ```Base Server``` sends messages to RabbitMQ, and the ```Log Server``` consumes those messages from the queue. Optionally, the ```Log Server``` can store the messages in a PostgreSQL database.

The PostgreSQL database can run on either a local machine or Docker, but storing the data in PostgreSQL is not mandatory. The database calls are just placeholders, and you can treat the example as a dummy implementation.

## Prerequisites
- ```Node.js``` : installed on your system
- ```Docker``` : installed to run RabbitMQ 
- ```PostgreSQL``` : (optional) if you want to store messages

## Project Structure
The project contains two services:

1. ```Base Server``` : This service receives HTTP requests and sends the request data to RabbitMQ.
2. ```Log Server``` : This service consumes the messages from RabbitMQ and processes them. If PostgreSQL is configured, it will log the data to a database; otherwise, it will just log to the console.


## Running RabbitMQ in Docker
To start RabbitMQ, use Docker:\
`docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

- Management UI: http://localhost:15672
- Default login: ```guest``` / ```guest```

## Base Server Setup (Producer)
The Base Server accepts HTTP POST requests and sends the request data to RabbitMQ.

1. **Install Dependencies**:\
Navigate to the base-server folder and install the required dependencies:\
`cd base-server`\
`npm install`

2. **Environment Variables**:\
Create a .env file in the base-server folder with the following content:\
`RABBITMQ_URL=amqp://localhost`\
`PORT=8000`

3. **Running the Base Server**:\
Run the Base Server:
`npm start`\
The server will be running at http://localhost:8000.

4. **Sending Requests**:\
You can send a POST request to the ```Base Server``` to test message sending to RabbitMQ. For example, using ```curl```:\
Eg - ```curl -X POST http://localhost:3000/request -H "Content-Type: application/json" -d '{"user": "John Doe", "action": "test action"}'```

Alternatively, you can use Postman or any API client to send the request.


## Project Flow
1. ```Base Server``` receives an HTTP POST request.
2. The ```Base Server``` sends the request data to ```RabbitMQ```.
3. ```Log Server``` consumes the message from ```RabbitMQ``` and logs it to the console or ```PostgreSQL```.

## Technologies Used
- ```Node.js```: Server-side JavaScript runtime.
- ```Express.js```: Web framework for handling HTTP requests in the ```Base Server```.
- ```RabbitMQ```: Message broker to decouple the ```Base Server``` and ```Log Server```.
- ```amqplib```: Node.js library for interacting with RabbitMQ.
- ```Docker```: Used to run RabbitMQ and PostgreSQL in a containerized environment.
- ```PostgreSQL```: Database for logging the messages (optional).

## Notes
- You do not need to store the messages in PostgreSQL. The database calls are simply an example of how you could extend the system to persist data.
- The PostgreSQL setup can be skipped entirely if you just want to log the messages to the console.
- I have gained a lot of respect for people who write such beautiful, extensive documentations after writing this small readme file. :white_flag: :wink:
