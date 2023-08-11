# Structure

```
Backend API Receive booking (Send to QUEUE)
```

```
Consumer QUEUE Executer Booking (Send to Socket)
```

```
Socket send notify to client listening
```


# How to run
Note : use Docker v4.20.0
```
git clone git@github.com:trankyhoathanh/nest_booking_queue.git
cd nest_booking_queue
docker compose up -d
```

# How to test
Step 1 : Connect socket with Postman API (or any way FrontEnd)
```
Open Postman
Create New, choose "WebSocket Request" (Beta)
Enter server URL : ws://localhost:32000
Connect
```

Step 1.2 : Open file index.html on browser
```
Open file html, message receive from server will "Booking current: number" when run stress test.
```

Step 2 : Run stress test
```
cd test
yarn
node stress_queue.js
```
Result order.txt file.
This is response of per request.

