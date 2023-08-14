
# Structure design
<img width="1022" alt="Screenshot 2023-08-14 at 11 23 04" src="https://github.com/trankyhoathanh/nest_booking_queue/assets/8115919/0ba22fb0-4fe0-41f9-9ab7-333a4430e53c">

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
Step 1 : Connect socket with Postman API
```
** Socket Raw
Open Postman
Create New, choose "WebSocket Request" (Beta)
Choose RAW
Enter server URL : ws://localhost:32000
Connect

** Socket IO
Open Postman
Create New, choose "WebSocket Request" (Beta)
Choose Socket.IO
Enter server URL : http://localhost:33000
Connect
```

Step 1.2 : Open file index.html on browser
```
Will receive message socket with WebSocket
```

Step 1.3 : Open file index_io.html on browser
```
Will receive message socket with Socket.IO
```

Step 2 : Run stress test
```
cd test
yarn
node stress_queue.js

OR

Click to Order Button from Client
```

Result order.txt file.
This is response of per request.

