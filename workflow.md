## Privileges

- Privileges will be based on routes. So, we'll create the list by having a script go round our route definitions and gather the list. Then save to DB.
- As much as practicable, make route on client same as route on server.

## User Registration

- Put out a page to collect lastname, firstname, middlename, email, phone?, password.
- On submit, create the user and set it to _disabled_.
- Send mail to the provided email with a verification token. User will have to click on the link provided.
- Once the email is verified, user will be asked to login with the password provided earlier.
- On successful login, user will be asked to update user profile: first name, last name, etc.
