# Web API documentation

## Usage

Api url: `http://localhost:2000`
Api responses on success return data in json format or json objects with the attribute `message` which contains a success message.

On bad requests or when an error occurs, the api returns a response with the appropriate status code and a json object with the attribute `message` which contains an error message. When an authentication error with a jwt occurs, the api returns a HTML response.

---

## User Controller

User controller api url: `http://localhost:2000/user`.

---

### POST Register:

**Description**

Creates a new user.

**Example request**

`http://localhost:2000/user/register`

**Authentication**

This request requires no authentication.

**Example request body**

```
{
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username",
    "password": "123456789",
    "dateOfBirth": "1999-01-01"
}
```

**Validations**

-   Every field is **required**.
-   Every field except `password` and `dateOfBirth` needs to be at least 3 characters long (6 characters for `password`).
-   Every field except `dateOfBirth` cannot be longer than 32 characters.

**Example response**

```
{
    "message": "Registration successful"
}
```

---

### POST Login

**Description**

Authenticates a user by returning a jwt.

**Example request**

`http://localhost:2000/user/login`

**Authentication**

This request requires no authentication.

**Example request body**

```
{
    "username": "username",
    "password": "123456789"
}
```

**Validations**

-   Every field is **required**.

**Example response**

```
{
    "id": 2,
    "username": "username",
    "firstName": "firstName",
    "lastName": "lastName",
    "dateOfBirth": "1999-01-01T00:00:00.000Z",
    "role": "User",
    "isSuspended": false,
    "createdAt": "2021-05-05T18:07:31.000Z",
    "updatedAt": "2021-05-05T18:07:31.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTYyMDIzODE4NiwiZXhwIjoxNjIwMzI0NTg2fQ.d7zUT5K7WPLItX9H8GN55FNu08Oo7aDOkhjSgiF1bZQ"
}
```

---

### PUT Update user

**Description**

Updates the user's account information by the user's id.

**Example request**

`http://localhost:2000/user/update/{userId}`

**Authentication**

This request requires a jwt that contains the same `userId`.

**Example request body**

```
{
    "firstName": "firstName",
    "lastName": "lastName",
    "username": "username",
    "password": "123456789",
    "dateOfBirth": "1999-01-01T00:00:00.000Z"
}
```

**Validations**

-   All of the fields are **optional**.
-   Every field except `password` and `dateOfBirth` needs to be at least 3 characters long (6 characters for `password`).
-   Every field except `dateOfBirth` cannot be longer than 32 characters.

**Example response**

```
{
    "id": 2,
    "username": "username",
    "firstName": "firstName",
    "lastName": "lastName",
    "dateOfBirth": "1999-01-01T00:00:00.000Z",
    "role": "User",
    "isSuspended": false,
    "createdAt": "2021-05-05T18:07:31.000Z",
    "updatedAt": "2021-05-05T18:17:24.131Z"
}
```

---

### DELETE Delete user

**Description**

Deletes a user by the user's id.

**Example request**

`http://localhost:2000/user/delete/{userId}`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "message": "User removed"
}
```

---

### GET Get all users

**Description**

Fetches all user data.

**Example request**

`http://localhost:2000/user/getAll`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "users": [
        {
            "id": 2,
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName",
            "dateOfBirth": "1999-01-01T00:00:00.000Z",
            "role": "Admin",
            "isSuspended": false,
            "createdAt": "2021-05-05T18:07:31.000Z",
            "updatedAt": "2021-05-05T18:17:24.000Z"
        }
    ]
}
```

---

### GET Get user by id

**Description**

Fetches a specific user's data by the user's id.

**Example request**

`http://localhost:2000/user/getById/{userId}`

**Authentication**

This request requires no authentication.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "id": 2,
    "username": "username",
    "firstName": "firstName",
    "lastName": "lastName",
    "dateOfBirth": "1999-01-01T00:00:00.000Z",
    "role": "Admin",
    "isSuspended": false,
    "createdAt": "2021-05-05T18:07:31.000Z",
    "updatedAt": "2021-05-05T18:17:24.000Z"
}
```

---

## Post Controller

Post controller api url: `http://localhost:2000/post`.

### POST Create post

**Description**

Creates a new post.

**Example request**

`http://localhost:2000/post/create`

**Authentication**

This request requires a jwt token to authenticate the user.

**Example request body**

```
{
    "title": "Post title",
    "description": "This is the description",
    "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "userId": 2,
}
```

**Validations**

-   Every field is **required**.
-   `title` minimum 3 and maximum 256 characters.
-   `description` minimum 3 characters.
-   `content` minimum 3 characters.

**Example response**

```
{
    "post": {
        "isHidden": false,
        "isSuspended": false,
        "id": 15,
        "title": "Post title",
        "description": "This is the description",
        "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "userId": 2,
        "updatedAt": "2021-05-07T11:04:09.034Z",
        "createdAt": "2021-05-07T11:04:09.034Z",
        "user": {
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName"
        },
        "reacts": [],
        "comments": []
    },
    "message": "Post created successfully"
}
```

---

### GET Get all posts

**Description**

Fetches all post data.

**Example request**

`http://localhost:2000/post/getAll`

**Authentication**

This request requires no authentication.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "posts": [
        {
            "id": 2,
            "title": "Post title",
            "description": "This is the description",
            "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
            "isHidden": false,
            "isSuspended": false,
            "createdAt": "2021-05-05T18:40:27.000Z",
            "updatedAt": "2021-05-05T19:04:24.000Z",
            "userId": 2,
            "user": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            },
            "comments": [
                {
                    "id": 1,
                    "content": "This is a comment",
                    "isSuspended": false,
                    "createdAt": "2021-05-05T19:09:24.000Z",
                    "updatedAt": "2021-05-05T19:09:24.000Z",
                    "userId": 2,
                    "postId": 2,
                    "user": {
                        "username": "username",
                        "firstName": "firstName",
                        "lastName": "lastName"
                    },
                    "reacts": []
                }
            ],
            "reacts": []
        }
    ]
}
```

---

### GET Get post by id

**Description**

Fetches a specific post by the post's id.

**Example request**

`http://localhost:2000/post/getById/{postId}`

**Authentication**

This request requires no authentication.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    {
    "id": 2,
    "title": "Post title",
    "description": "This is the description",
    "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
    "isHidden": false,
    "isSuspended": false,
    "createdAt": "2021-05-05T18:40:27.000Z",
    "updatedAt": "2021-05-05T19:04:24.000Z",
    "userId": 2,
    "user": {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    },
    "comments": [
        {
            "id": 1,
            "content": "This is a comment",
            "isSuspended": false,
            "createdAt": "2021-05-05T19:09:24.000Z",
            "updatedAt": "2021-05-05T19:09:24.000Z",
            "userId": 2,
            "postId": 2,
            "user": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            },
            "reacts": []
        }
    ],
    "reacts": []
    }
}
```

### PUT Update post

**Description**

Updates the posts information by the post's id.

**Example request**

`http://localhost:2000/post/update/{postId}`

**Authentication**

This request requires a jwt with the same `userId` as the post's creator.

**Example request body**

```
{
    "title": "New post title",
    "description": "This is the description",
    "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
```

**Validations**

-   Every field is **optional**.
-   Every field except `photoUrl` requires minimum 3 characters.
-   Field `title` cannot exceed 256 characters.

**Example response**

```
{
    "id": 2,
    "title": "New post title",
    "description": "This is the description",
    "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
    "isHidden": false,
    "isSuspended": false,
    "createdAt": "2021-05-05T18:40:27.000Z",
    "updatedAt": "2021-05-07T11:24:04.721Z",
    "userId": 2,
    "user": {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    },
    "reacts": [],
    "comments": [
        {
            "id": 1,
            "content": "This is a comment",
            "isSuspended": false,
            "createdAt": "2021-05-05T19:09:24.000Z",
            "updatedAt": "2021-05-05T19:09:24.000Z",
            "userId": 2,
            "postId": 2,
            "user": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            },
            "reacts": []
        }
    ]
}
```

---

### DELETE Delete post

**Description**

Deletes the post by the post's id.

**Example request**

`http://localhost:2000/post/delete/{postId}`

**Authentication**

This request requires a jwt with the same `userId` as the post's creator or a `role` of **admin**.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "message": "Post removed"
}
```

---

### GET Get user's posts

**Description**

Fetches a spefici user's posts by the users id.

**Example request**

`http://localhost:2000/post/getByUser/{userId}`

**Authentication**

This request requires no authentication.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "posts": [
        {
            "id": 2,
            "title": "New post title",
            "description": "This is the description",
            "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
            "isHidden": false,
            "isSuspended": false,
            "createdAt": "2021-05-05T18:40:27.000Z",
            "updatedAt": "2021-05-07T11:24:04.000Z",
            "userId": 2,
            "user": {
                "username": "username"
            },
            "comments": [
                {
                    "id": 1,
                    "content": "This is a comment",
                    "isSuspended": false,
                    "createdAt": "2021-05-05T19:09:24.000Z",
                    "updatedAt": "2021-05-05T19:09:24.000Z",
                    "userId": 2,
                    "postId": 2,
                    "user": {
                        "username": "username",
                        "firstName": "firstName",
                        "lastName": "lastName"
                    },
                    "reacts": []
                }
            ],
            "reacts": []
        }
    ]
}
```

---

### PUT Hide/Unhide post

**Description**

Hides or unhides the post by the post's id.

**Example request**

`http://localhost:2000/post/hide/{postId}`

**Authentication**

This request requires a jwt with the same `userId` as the post's owner.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "id": 2,
    "title": "Post title",
    "description": "This is the description",
    "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
    "isHidden": true,
    "isSuspended": false,
    "createdAt": "2021-05-09T15:33:21.000Z",
    "updatedAt": "2021-05-09T15:38:43.029Z",
    "userId": 1,
    "user": {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    },
    "reacts": [],
    "comments": []
}
```

---

### GET Get posts by search

**Description**

Fetches all posts that have a similar title or post creator's username to the provided post search value.

**Example request**

`http://localhost:2000/post/getBySearch?value={post_title|username}`

**Authentication**

This request requires no authentication.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "posts": [
        {
            "id": 2,
            "title": "New post title",
            "description": "This is the description",
            "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
            "isHidden": false,
            "isSuspended": false,
            "createdAt": "2021-05-05T18:40:27.000Z",
            "updatedAt": "2021-05-07T11:24:04.000Z",
            "userId": 2,
            "user": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            },
            "comments": [
                {
                    "id": 1,
                    "content": "This is a comment",
                    "isSuspended": false,
                    "createdAt": "2021-05-05T19:09:24.000Z",
                    "updatedAt": "2021-05-05T19:09:24.000Z",
                    "userId": 2,
                    "postId": 2,
                    "user": {
                        "username": "username",
                        "firstName": "firstName",
                        "lastName": "lastName"
                    },
                    "reacts": []
                }
            ],
            "reacts": []
        }
    ]
}
```

---

### GET Get user's hidden posts

**Description**

Fetches all user's hidden posts by the user's id.

**Example request**

`http://localhost:2000/post/getHidden/{userId}`

**Authentication**

This request requires a jwt with the same `userId` or `role` of **admin**.

**Example request body**

```
This request does not require a body.
```

**Validations**

This request does not have validations.

**Example response**

```
{
    "posts": [
        {
            "id": 2,
            "title": "Post title",
            "description": "This is the description",
            "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
            "isHidden": true,
            "isSuspended": false,
            "createdAt": "2021-05-09T15:33:21.000Z",
            "updatedAt": "2021-05-09T15:38:43.000Z",
            "userId": 1,
            "user": {
                "username": "username"
            },
            "comments": [],
            "reacts": []
        }
    ]
}
```

---

### POST Create post comment

**Description**

Creates a new comment for that post.

**Example request**

`http://localhost:2000/post/comment`

**Authentication**

This request requires a jwt to authenticate the user.

**Example request body**

```
{
    "content": "This is a comment",
    "postId": 2
}
```

**Validations**

-   Every field is **required**.

**Example response**

```
{
    "comment": {
        "isSuspended": false,
        "id": 6,
        "content": "This is a comment",
        "postId": 2,
        "userId": 2,
        "updatedAt": "2021-05-07T11:50:31.359Z",
        "createdAt": "2021-05-07T11:50:31.359Z",
        "user": {
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName"
        },
        "reacts": []
    },
    "message": "Comment created"
}
```

---

### POST Add a reaction to post

**Description**

Adds a reaction to the post.

**Example request**

`http://localhost:2000/post/postReact`

**Authentication**

This request requires a jwt to authenticate the user.

**Example request body**

```
{
    "reaction": "Smile",
    "postId": 2
}
```

**Validations**

-   Every field is **required**.
-   Field `reaction` must be one of the following values: `'Smile', 'Like', 'Heart', 'Laugh', 'Surprised'`.

**Example response**

```
{
    "id": 4,
    "reaction": "Smile",
    "postId": 2,
    "userId": 2,
    "updatedAt": "2021-05-07T18:19:05.879Z",
    "createdAt": "2021-05-07T18:19:05.879Z",
    "user": {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    }
}
```

---

### POST Add a reaction to comment

**Description**

Adds a reaction to the comment.

**Example request**

`http://localhost:2000/post/commentReact`

**Authentication**

This request requires a jwt to authenticate the user.

**Example request body**

```
{
    "reaction": "Smile",
    "commentId": 1
}
```

**Validations**

-   Every field is **required**.
-   Field `reaction` must be one of the following values: `'Smile', 'Like', 'Heart', 'Laugh', 'Surprised'`.

**Example response**

```
{
    "id": 3,
    "reaction": "Smile",
    "commentId": 1,
    "userId": 2,
    "updatedAt": "2021-05-07T18:30:20.675Z",
    "createdAt": "2021-05-07T18:30:20.675Z",
    "user": {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    }
}
```

---

### GET Get post comments

**Description**

Fetches the post's comments with it's reactions by the post's id.

**Example request**

`http://localhost:2000/post/comments/{post_id}`

**Example response**

```
{
    "comments": [
        {
            "id": 1,
            "content": "This is a comment",
            "isSuspended": false,
            "createdAt": "2021-05-05T19:09:24.000Z",
            "updatedAt": "2021-05-05T19:09:24.000Z",
            "userId": 2,
            "postId": 2,
            "user": {
                "username": "username"
            },
            "reactions": [
                {
                    "id": 1,
                    "reaction": "Smile",
                    "createdAt": "2021-05-05T19:20:19.000Z",
                    "updatedAt": "2021-05-05T19:20:19.000Z",
                    "userId": 2,
                    "commentId": 1,
                    "user": {
                        "username": "username"
                    }
                }
            ]
        },
        {
            "id": 2,
            "content": "Comment two",
            "isSuspended": false,
            "createdAt": "2021-05-06T13:34:31.000Z",
            "updatedAt": "2021-05-06T13:34:31.000Z",
            "userId": 2,
            "postId": 2,
            "user": {
                "username": "username"
            },
            "reactions": []
        }
    ]
}
```

---

### DELETE Remove a post react

**Description**

Removes a reaction from the post by the reaction's id.

**Example request**

`http://localhost:2000/post/postReact/{react_id}`

**Authentication**

This request requires a jwt that contains the same `userId` as the react.

---

### DELETE Remove a comment react

**Description**

Removes a reaction from the comment by the reaction's id.

**Example request**

`http://localhost:2000/post/commentReact/{react_id}`

**Authentication**

This request requires a jwt that contains the same `userId` as the react.

---

## Admin Controller

Admin controller api url `http://localhost:2000/admin`

---

### GET Get all user suspensions

**Description**

Fetches all user suspensions.

**Example request**

`http://localhost:2000/admin/suspensions/user`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
[
    {
        "id": 2,
        "username": "baduser",
        "firstName": "firstName",
        "lastName": "lastName",
        "role": "User",
        "createdAt": "2021-05-10T18:51:07.000Z",
        "reason": "Fraud",
        "validUntil": null,
        "admin": {
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName"
        }
    }
]
```

---

### GET Get all post suspensions

**Description**

Fetches all post suspensions.

**Example request**

`http://localhost:2000/admin/suspensions/post`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
[
    {
        "id": 6,
        "title": "Post title",
        "description": "This is the description",
        "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
        "isHidden": false,
        "reason": "Fraud",
        "createdAt": "2021-05-09T19:14:08.000Z",
        "creator": {
            "id": 2,
            "username": "baduser",
            "firstName": "firstName",
            "lastName": "lastName",
            "role": "User",
            "createdAt": "2021-05-09T19:12:15.000Z",
            "isSuspended": true
        },
        "admin": {
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName"
        }
    }
]
```

---

### GET Get all comment suspensions

**Description**

Fetches all comment suspensions.

**Example request**

`http://localhost:2000/admin/suspensions/comment`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
[
    {
        "id": 2,
        "content": "This is a comment",
        "postId": 2,
        "reason": "Inappropriate",
        "createdAt": "2021-05-10T18:34:57.000Z",
        "creator": {
            "id": 1,
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName",
            "role": "Admin",
            "createdAt": "2021-05-09T15:33:07.000Z",
            "isSuspended": false
        },
        "admin": {
            "username": "username",
            "firstName": "firstName",
            "lastName": "lastName"
        }
    }
]
```

---

### GET Get all suspensions

**Description**

Fetches all user, post and comment suspensions.

**Example request**

`http://localhost:2000/admin/suspensions`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
{
    "users": [
        {
            "id": 2,
            "username": "baduser",
            "firstName": "firstName",
            "lastName": "lastName",
            "role": "User",
            "createdAt": "2021-05-10T18:51:07.000Z",
            "reason": "Fraud",
            "validUntil": null,
            "admin": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            }
        }
    ],
    "posts": [
        {
            "id": 6,
            "title": "Post title",
            "description": "This is the description",
            "photoUrl": "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i",
            "isHidden": false,
            "reason": "Fraud",
            "createdAt": "2021-05-09T19:14:08.000Z",
            "creator": {
                "id": 2,
                "username": "baduser",
                "firstName": "firstName",
                "lastName": "lastName",
                "role": "User",
                "createdAt": "2021-05-09T19:12:15.000Z",
                "isSuspended": true
            },
            "admin": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            }
        }
    ],
    "comments": [
        {
            "id": 2,
            "content": "This is a comment",
            "postId": 2,
            "reason": "Inappropriate",
            "createdAt": "2021-05-10T18:34:57.000Z",
            "creator": {
                "id": 1,
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName",
                "role": "Admin",
                "createdAt": "2021-05-09T15:33:07.000Z",
                "isSuspended": false
            },
            "admin": {
                "username": "username",
                "firstName": "firstName",
                "lastName": "lastName"
            }
        }
    ]
}
```

---

### POST Suspend user

**Description**

Suspends the user and all of his posts.

**Example request**

`http://localhost:2000/admin/suspend/user`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example request body**

```
{
    "reason": "Fraud",
    "validUntill": null
    "userId": 2
}
```

**Validations**

-   Fields `reason` and `userId` are **required**, `validUntil` is **optional**
-   Field `reason` must be one of the following: `'Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'`

**Example response**

```
{
    "message": "User suspended"
}
```

---

### POST Suspend post

**Description**

Suspends the post.

**Example request**

`http://localhost:2000/admin/suspend/post`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example request body**

```
{
    "reason": "Fraud"
    "postId": 2
}
```

**Validations**

-   All fields are **required**
-   Field `reason` must be one of the following: `'Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'`

**Example response**

```
{
    "message": "Post suspended"
}
```

---

### POST Suspend comment

**Description**

Suspends the comment.

**Example request**

`http://localhost:2000/admin/suspend/comment`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example request body**

```
{
    "reason": "Fraud"
    "commentId": 2
}
```

**Validations**

-   All fields are **required**
-   Field `reason` must be one of the following: `'Fraud', 'Inappropriate', 'Violence', 'Spam', 'Hate speech'`

**Example response**

```
{
    "message": "Comment suspended"
}
```

---

### PUT Unsuspend user

**Description**

Removes the user's suspension by the user's id.

**Example request**

`http://localhost:2000/admin/unsuspend/user/{userId}`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
{
    "message": "User unsuspended"
}
```

---

### PUT Unsuspend post

**Description**

Removes the post's suspension by the post's id.

**Example request**

`http://localhost:2000/admin/unsuspend/post/{postId}`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
{
    "message": "Post unsuspended"
}
```

---

### PUT Unsuspend comment

**Description**

Removes the comment's suspension by the comment's id.

**Example request**

`http://localhost:2000/admin/unsuspend/comment/{commentId}`

**Authentication**

This request requires a jwt with the `role` of **admin**.

**Example response**

```
{
    "message": "Comment unsuspended"
}
```

---

## Communication Controller

Communication controller api url `http://localhost:2000/communication`

---

### POST Follow user

**Description**

Follows another user.

**Example request**

`http://localhost:2000/communication/follow`

**Authentication**

This request requires a jwt.

**Example request body**

```
{
    "followeeId": 2
}
```

**Validations**

-   Field `followeeId` is **required**.

**Example response**

```
{
    "id": 1,
    "userId": 2,
    "username": "username2",
    "firstName": "firstName",
    "lastName": "lastName",
    "dateOfBirth": "1999-01-01T00:00:00.000Z",
    "role": "User",
    "isSuspended": false,
    "createdAt": "2021-05-09T19:12:15.000Z",
    "updatedAt": "2021-05-10T18:51:07.000Z",
    "followingSince": "2021-05-11T14:41:25.402Z"
}
```

---

### DELETE Unfollow user

**Description**

Unfollows another user.

**Example request**

`http://localhost:2000/communication/unfollow/{follow_id}`

**Authentication**

This request requires a jwt.

---

### POST Follow user

**Description**

Follows another user.

**Example request**

`http://localhost:2000/communication/follow`

**Authentication**

This request requires a jwt.

**Example request body**

```
{
    "followeeId": 2
}
```

**Validations**

-   Field `followeeId` is **required**.

**Example response**

```
{
    "id": 1,
    "userId": 2,
    "username": "username2",
    "firstName": "firstName",
    "lastName": "lastName",
    "dateOfBirth": "1999-01-01T00:00:00.000Z",
    "role": "User",
    "isSuspended": false,
    "createdAt": "2021-05-09T19:12:15.000Z",
    "updatedAt": "2021-05-10T18:51:07.000Z",
    "followingSince": "2021-05-11T14:41:25.402Z"
}
```

---

### GET Get user's followed users list

**Description**

Fetches all user's followed users list

**Example request**

`http://localhost:2000/communication/follows/{user_id}`

**Authentication**

This request requires a jwt.

**Example response**

```
[
    {
        "id": 16,
        "createdAt": "2021-05-11T14:45:12.000Z",
        "username": "username2",
        "firstName": "firstName",
        "lastName": "lastName"
    }
]
```

---
