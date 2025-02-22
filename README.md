
# API For Note App 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGODB`
`TOKEN_SECRET_KEY`
`CORS_OPTION`


## API Reference

#### Register Account

```text
   POST /user/register
```

| Parameter | Type     |
| :-------- | :------- | 
| `username` | `string` |
| `password` | `string` |
| `email` | `string ( john@gmail.com )` |

#### Login Account
```text
   POST /user/login
```

| Parameter | Type  |
| :-------- | :------- |
| `email` | `string ( john@gmail.com )` |
| `password` | `string` |

#### Logout

```text
  GET /user/logout
```

#### Add Note
```text
   POST /note/add
```

| Parameter | Type     | 
| :-------- | :------- | 
| `text` | `string` |

#### Get Your Note
```text
   GET /note/own?page={number}
```

#### Delete Your Note
```text
   DELETE  /note/own/delete
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |

#### Update Your Note
```text
   PUT  /note/own/update
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID) ` |
| `text` | `string` |

#### Share Your Note
```text
   POST /note/share
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `permission` | `number ( 4 or 6 )` |
| `people` | `[string ( john@gmail.com )]` |

#### Get Notes Shared By Others
```text
   GET /note/share?page={number}
```

#### Update Note Shared By Others
```text
   PUT /note/share/update
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `text` | `string` |

#### Remove Sharing with others
```text
   PUT /note/share/remove-sharing
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `person` | `string ( john@gmail.com )` |

#### Change Permission
```text
   PUT /note/share/update-permission
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `person` | `string ( john@gmail.com )` |
| `permission` | `number ( 4 or 6 ) ` |



## Tech Stack

express, bcrypt, cookie-parser, cors, dotenv, joi, jsonwebtoken, mongoose  


## Run Locally

Clone the project

```bash
  git clone https://github.com/t-web-ai/note-app-server
```

Go to the project directory

```bash
  cd note-app-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Deployment

To deploy this project run

```bash
  npm run start
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@toeethihakyaw](https://www.github.com/toeethihakyaw)
- [@t-web-ai](https://www.github.com/t-web-ai)


## 🚀 About Me
I'm Toee Thiha Kyaw, Full stack developer...


## Feedback

If you have any feedback, please reach out to us at otpservice38@gmail.com


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGODB`
`TOKEN_SECRET_KEY`


## API Reference

#### Register Account

```http
   POST /user/register
```

| Parameter | Type     |
| :-------- | :------- | 
| `username` | `string` |
| `password` | `string` |
| `email` | `string ( john@gmail.com )` |

#### Login Account
```http
   POST /user/login
```

| Parameter | Type  |
| :-------- | :------- |
| `email` | `string ( john@gmail.com )` |
| `password` | `string` |

#### Logout

```http
  GET /user/logout
```

#### Add Note
```http
   POST /note/add
```

| Parameter | Type     | 
| :-------- | :------- | 
| `text` | `string` |

#### Get Your Note
```http
   GET /note/own?page={number}
```

#### Delete Your Note
```http
   DELETE  /note/own/delete
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |

#### Update Your Note
```http
   PUT  /note/own/update
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID) ` |
| `text` | `string` |

#### Share Your Note
```http
   POST /note/share
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `permission` | `number ( 4 or 6 )` |
| `people` | `[string ( john@gmail.com )]` |

#### Get Notes Shared By Others
```http
   GET /note/share?page={number}
```

#### Update Note Shared By Others
```http
   PUT /note/share/update
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `text` | `string` |

#### Remove Sharing with others
```http
   PUT /note/share/remove-sharing
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `person` | `string ( john@gmail.com )` |

#### Change Permission
```http
   PUT /note/share/update-permission
```
| Parameter | Type     | 
| :-------- | :------- | 
| `id` | `string ( Note's ID )` |
| `person` | `string ( john@gmail.com )` |
| `permission` | `number ( 4 or 6 ) ` |



## Tech Stack

express, bcrypt, cookie-parser, cors, dotenv, joi, jsonwebtoken, mongoose  


## Run Locally

Clone the project

```bash
  git clone https://github.com/t-web-ai/note-app-server
```

Go to the project directory

```bash
  cd note-app-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Deployment

To deploy this project run

```bash
  npm run start
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@toeethihakyaw](https://www.github.com/toeethihakyaw)
- [@t-web-ai](https://www.github.com/t-web-ai)


## 🚀 About Me
I'm Toee Thiha Kyaw, Full stack developer...


## Feedback

If you have any feedback, please reach out to us at otpservice38@gmail.com

