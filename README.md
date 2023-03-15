# Veryable: Front-End Coding Challenge

This React application is designed to render a list of users with color-coded roles and additional information about each user. With a built-in filter, you can easily sort the results based on a user's role.

## Steps to run:

Clone the repository.
In the veryable_app folder, run the following:

```bash
npm install
```

Start the app with the following command:

```bash
npm start
```

## Features

1. List of users with color coded roles for users, and introductory user information. 
2. Expand more icon that allows you to expand the card see additional information about the users.
3. A filter that can filter the results by user's roles and show all users of that role.

## Additional Cases Handled
* If the users.json file has no users, return an error message.
* If any of the fields are missing, return an error message. 
  * If part of the address is missing, what is available will be shown. An error message will appear if no part of the address is available.
  * If part of the name is missing, what is available will be shown. An error message will appear if no part of the name is available.
* If a user is not an administrator, user or viewer, their user icon will be color coded purple.
* If there are any extra fields containing extra information about the viewers, they will be ignored. 
