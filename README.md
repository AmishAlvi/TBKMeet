## Installing application

after downloading the application navigate to client folder and run 


```cd client```
```npm install``` 


to install all dependancies for client

then navigate to server folder and do the same

```cd server```
```npm install``` 

### Run application

In order to run the application locally navigate to server folder and start server first

```cd server```
```node app.js```

then navigate to the client folder and start the client react app

``` cd client ```
``` npm start ```

app should now launch locally and have access to the backend server aswell

there is no need to do anything with the videoserver folder as the video serevr runs through internet websockets even on a locally running application. make sure to have a working internet connection in order to access the video conferencing features.

