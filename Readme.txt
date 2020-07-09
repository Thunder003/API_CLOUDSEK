There will be two table in the database, users and login. 
The users table will be storing name, remain(Attempts remaining), password, entries(Number of attempt user has made).
The login table will be storing hash and email of every user.

I'm assuming that the front will part going to handle everything. Like for signIn route, API is responding the user[0], I'm assuming,
that front end will have required code which will take the user[0] object and modify all the values accoring to the respective user 
and display user page.

For the endpoint '/' I'm just sending all the users.
Inside the registration end point, as there will be two database handling at a time, I used transaction properties in it.
As mentioned in the task to allow "/see_remaining_limits" and "/call_api" endpoint to authenticate users only, this will be handled in
the front end part only, as the user signIn, will be redirected to its own page only where he/she will get option of going to this endpoints
 

Knex is a library for database, 
bcrypt for password encoding
Express framework for server setup.
bodyparser to parse all the requests.

 
