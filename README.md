Links;
Azure: https://task-mern-app.azurewebsites.net/
Repository: https://github.com/Awarden1/Task-mern-app

How to run the APP:
First off go to package.json file and start off node app.js to connect MongoDB.

Go onto the package.json file in Client folder and run "react-scripts start".
The website will then load up and user has to create an account to enter the website.
First register with an email, then click sign up until prompt comes up. After that, go back and sign in with the account.


* [x] Some form of Login and access control
* [x] Jest tests
* [x] Snapshot tests
* [x] Simulate + jest.fn
* [x] Supertest
* [x] Github Actions with coverage report
* [x] Mongodb
* [x] Navigating in the application using React Router (remember Express Middleware)
* [x] Reading data from the server (remember error handling)
* [x] Writing data to the server
* [x] Deployment to cloud (in this case, Azure) 
* [ ] Websockets


##Api endpoint:

Auth endpoint:

/api/auth/login

to login the user

/api/auth/createUser

to signup new user

Task endpoints:

*/api/task/getTask

to get all the tasks

*/api/task/createTask

to create the task

*/api/task/updateTask

to update all the task

*/api/task/deleteTask

to delete all the task

##Run test cases

run command: yarn run test

