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

`http://localhost:2000/post/getByUser/{userId}?logged_in_id={1}`

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

### POST Follow/Unfollow user

**Description**

Follows or unfollows another user.

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

or null
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

### GET Get chat history

**Description**

Fetches all of specific chat's messages.

**Example request**

`http://localhost:2000/communication/chat/{user_id}?page={0}&per_page={10}`

**Query parameters**

-   Every parameter is **optional**
-   Parameter `page` by default is 0
-   Parameter `per_page` by default is 20

**Authentication**

This request requires a jwt.

**Example response**

```
{
    "messages": [
        {
            "id": 6,
            "content": "Message two",
            "createdAt": "2021-05-21T17:10:59.000Z",
            "updatedAt": "2021-05-21T17:10:59.000Z",
            "senderId": 2,
            "chatId": 1
        },
        {
            "id": 2,
            "content": "This is a message",
            "createdAt": "2021-05-21T15:38:45.000Z",
            "updatedAt": "2021-05-21T15:38:45.000Z",
            "senderId": 1,
            "chatId": 1
        }
    ]
}
```

---

### POST Add a message

**Description**

Adds a message to the database.

**Example request**

`http://localhost:2000/communication/message`

**Authentication**

This request requires a jwt.

**Example request body**

```
{
    "content": "This is a message",
    "userId": 2
}
```

**Validations**

-   All fields are **required**
-   Field `content` must be between 1 and 512 characters long.

**Example response**

```
{
    "id": 2,
    "content": "This is a message",
    "senderId": 1,
    "chatId": 1,
    "updatedAt": "2021-05-21T15:38:45.398Z",
    "createdAt": "2021-05-21T15:38:45.398Z"
}
```

---

### POST Mute/Unmute a user

**Description**

Mutes or unmutes the specified user.

**Example request**

`http://localhost:2000/communication/mute/{user_id}`

**Authentication**

This request requires a jwt.

---

## Outer Services Controller

Outer service controller api url: `http://localhost:2000/outer_service`.

---

### GET Get tweets

**Description**

Fetches a specific number of tweets by the search query and tweet date.

**Example request**

`http://localhost:2000/outer_service/tweets?search={query}&date={2021-04-16}&count={1}`

**Query parameters**

-   Parameter `seach` is **required**
-   Parameter `date` is **optional**, the default value is the previous month's date e.g. if today is 2020-02-11 then the default date is 2020-01-11
-   Parameter `count` is **optional**, the default value is 10

**Example response**

```
{
    "statuses": [
        {
            "created_at": "Sun May 16 19:26:14 +0000 2021",
            "id": 1394011328222843000,
            "id_str": "1394011328222842884",
            "text": "These #Banana #Pancakes Are Just 40 Calories Each\n\nhttps://t.co/xm9BJhmHXf",
            "truncated": false,
            "entities": {
                "hashtags": [
                    {
                        "text": "Banana",
                        "indices": [
                            6,
                            13
                        ]
                    },
                    {
                        "text": "Pancakes",
                        "indices": [
                            14,
                            23
                        ]
                    }
                ],
                "symbols": [],
                "user_mentions": [],
                "urls": [
                    {
                        "url": "https://t.co/xm9BJhmHXf",
                        "expanded_url": "https://www.livestrong.com/article/13713480-these-banana-pancakes-are-just-40-calories-each/",
                        "display_url": "livestrong.com/article/137134…",
                        "indices": [
                            51,
                            74
                        ]
                    }
                ]
            },
            "metadata": {
                "iso_language_code": "en",
                "result_type": "recent"
            },
            "source": "<a href=\"https://www.socialjukebox.com\" rel=\"nofollow\">The Social Jukebox</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 711041288867594200,
                "id_str": "711041288867594240",
                "name": "Health & Fitness💪😎",
                "screen_name": "YouTubeFitness3",
                "location": "Please SUBSCRIBE to my channel",
                "description": "Do it➡\nFilm it➡\nShare it➡\nTweets from individuals who are sincerely passionate about HEALTH🍎 & FITNESS🏋\n(@PersonalFitnes3) (@TankyTalks) (@videos2watchNOW)",
                "url": "https://t.co/xNduRJxtxx",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/xNduRJxtxx",
                                "expanded_url": "https://linktr.ee/PersonalFitness3",
                                "display_url": "linktr.ee/PersonalFitnes…",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 792,
                "friends_count": 989,
                "listed_count": 41,
                "created_at": "Sat Mar 19 04:07:08 +0000 2016",
                "favourites_count": 9181,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": false,
                "verified": false,
                "statuses_count": 26910,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "F5F8FA",
                "profile_background_image_url": null,
                "profile_background_image_url_https": null,
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/831474595882479616/rEXce246_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/831474595882479616/rEXce246_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/711041288867594240/1487074853",
                "profile_link_color": "1DA1F2",
                "profile_sidebar_border_color": "C0DEED",
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": false,
                "default_profile": true,
                "default_profile_image": false,
                "following": null,
                "follow_request_sent": null,
                "notifications": null,
                "translator_type": "none",
                "withheld_in_countries": []
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 0,
            "favorite_count": 0,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
        }
    ],
    "search_metadata": {
        "completed_in": 0.058,
        "max_id": 1394011328222843000,
        "max_id_str": "1394011328222842884",
        "next_results": "?max_id=1394011328222842883&q=%23banana%20since%3A2021-04-16T19%3A32%3A13.959Z&count=1&include_entities=1",
        "query": "%23banana+since%3A2021-04-16T19%3A32%3A13.959Z",
        "refresh_url": "?since_id=1394011328222842884&q=%23banana%20since%3A2021-04-16T19%3A32%3A13.959Z&include_entities=1",
        "count": 1,
        "since_id": 0,
        "since_id_str": "0"
    }
}
```

---

### GET Get job list

**Description**

Fetches all jobs according to the provided description and location.

**Example request**

`http://localhost:2000/outer_service/jobs?description={javascript}&location={Berlin}&full_time=${true}&page={1}`

**Query parameters**

-   Every parameter is **optional**
-   Parameter `page` by default is 0
-   Parameter `full_time` by default is true - only full time positions are included

**Example response**

```
{
    "0": {
        "id": "d05e4007-8114-4804-9694-ddfd26aa111e",
        "type": "Full Time",
        "url": "https://jobs.github.com/positions/d05e4007-8114-4804-9694-ddfd26aa111e",
        "created_at": "Mon May 03 15:17:32 UTC 2021",
        "company": "Civey GmbH",
        "company_url": "https://civey.com/",
        "location": "Berlin",
        "title": "Senior JavaScript Engineer (m/f/x) in full- or part-time",
        "description": "<p><strong>Your new Job</strong></p>\n<p><strong>You continuously improve the frontend of Civey together with our team</strong></p>\n<ul>\n<li>You develop, test, document and maintain our JS driven web applications. We strive to ensure code quality with reviews, pair-programming and alignment with strong engineering principles and standards.</li>\n<li>As part of the Dev Team, you get to work closely with our Devops Engineers, Data Engineers, Product Owners and Designers.</li>\n<li>Our source code is hosted on GitHub and our libraries are hosted as private npm modules. We do code reviews with pull requests, we do automated testing and our release process is fully automated by our CI/CD system.</li>\n<li>Your work will be seen by millions of visitors through our partners’ websites, including top German media outlets like Spiegel Online, Tagesspiegel, <a href=\"http://change.org/\">Change.org</a>, Die Welt and a lot more.</li>\n<li>You will work with an excellent team you can learn a lot from and that will always appreciate your ideas.</li>\n<li>You start in full-time or part-time (30h+ per week).</li>\n</ul>\n<p><strong>Civey is the leading company for digital opinion data in Germany</strong></p>\n<p>Civey represents a new generation of public opinion research. Instead of outdated methods we rely on digital technologies to pioneer high quality representative surveys in real time. Our vision is to enable everyone to access the results of our work.</p>\n<p><strong>Our clients and public benefit from our technology</strong></p>\n<p>We are the only provider to offer over one million active users per month immediate access to representative live data. Customers from different backgrounds such as politics, business and media benefit from an innovative synthesis of survey statistics and machine learning. We enable them to measure markets, consumption and attitudes around the clock in order to collect valid data for the smallest target groups. In doing so, we set new standards for precision and speed.</p>\n<p><strong>Now we are looking for you!</strong></p>\n<p>This is just the beginning. Founded in 2015 by Janina Mütze and Gerrit Richter more than 60 consultants, developers and statisticians from 12 Countries are currently working for Civey in Berlin. If you want to help transform the path of traditional opinion research and you live for new technologies, then we are looking for you. You should be able to work independently in a structured manner and have the ambition to achieve more than others. Does that sound good? Get in touch with us!</p>\n<p>Learn more about Civey and its team at <a href=\"http://t3u1.mjt.lu/lnk/AMwAAKCTIpAAAAAAAAAAAG3sWXAAAAAA-nQAAAAAAAZPNgBgj73iGHcqtsfGQeuTzv6vQfq6YAAGCXo/2/cSxFs1KzOefTLOB5urXe9A/aHR0cDovL3d3dy5jaXZleS5jb20vdWViZXItY2l2ZXkvam9icy11bmQtdGVhbQ\">www.civey.com/ueber-civey/jobs-und-team</a>.</p>\n<p><strong>Your Talents</strong></p>\n<p><strong>You are great at building data-rich web applications and are curious about the latest techniques in your field.</strong></p>\n<ul>\n<li>You have at least 5 years of experience in  building highly functional and fast, data-rich SPAs with dynamic interfaces.</li>\n<li>You have strong Typescript and React skills and are comfortable using the best coding, testing, debugging, and automation techniques.</li>\n<li>You have experience working as a developer and can provide good insights on the trade-offs between frontend JS frameworks like React, Vue, Svelte etc.</li>\n<li>You have an eye for UI/UX and accessibility and you're familiar with the challenges of modern web development.</li>\n<li>You have worked with node.js before to build the backend for a web application and know how to talk to a database or are interested in learning about this aspect of web development.</li>\n</ul>\n<p><strong>Your Package</strong></p>\n<p><strong>We are offering more than just benefits</strong></p>\n<ul>\n<li>\n<strong>Our values:</strong> We’re combining a conclusive business model with our vision to give all people access to high-quality opinion research.</li>\n<li>\n<strong>International:</strong> Our team is from China, Brasil, Germany, Vietnam and many other countries. Those who want can join our weekly German course.</li>\n<li>\n<strong>Visa support:</strong> We support our candidates throughout the whole visa process.</li>\n<li>\n<strong>Personal development:</strong> We promise a steep learning curve and an opportunity to boost your career.</li>\n<li>\n<strong>Equality:</strong> We are an equal opportunity employer and encourage everyone, regardless of gender, nationality, sexual orientation, age, ethnicity or belief to apply at Civey.</li>\n<li>\n<strong>Fair deal:</strong> We’ve devoted ourselves to fairness and transparency - this is why we foster a culture of constructive criticism. In return, we ask for your full commitment.</li>\n<li>\n<strong>Great location:</strong> Our office is located between Mitte and Kreuzberg, close to Moritzplatz.</li>\n<li>\n<strong>Training:</strong> We cover 90% of the costs of books, conferences and workshops.</li>\n<li>\n<strong>Sports and transportation:</strong> We cover your gym contract, your public transport ticket or a company bike.</li>\n<li>\n<strong>Mental health:</strong> You get professional support through an independent expert for personal or professional challenges.</li>\n<li>\n<strong>Pension plan:</strong> You can invest in your future with our company pension plan and capital-forming benefits.</li>\n<li>\n<strong>Good start into the day:</strong> We offer you breakfast, healthy fruits, free drinks and fresh coffee.</li>\n<li>\n<strong>Team Events:</strong> Celebrate with your colleagues on a regular basis.</li>\n<li>\n<strong>Technical equipment:</strong> We’ll provide you with the equipment you need to be able to work efficiently.</li>\n<li>\n<strong>Ask-me-Anything:</strong> Every employee can anonymously ask questions that our founders answer publicly.</li>\n<li>\n<strong>Clear structure:</strong> We have a proven feedback system consisting of stand-ups, review meetings and retrospectives.</li>\n<li>\n<strong>Recreation:</strong> We offer 30 days vacation, flexible working hours, overtime compensation and home office if needed.</li>\n<li>\n<strong>Salary:</strong> We will pay you a fair and competitive compensation.</li>\n</ul>\n<p><strong>Get in touch</strong></p>\n<p>For any questions about this position please get in touch with our Talent Manager Freyja Werner at <a href=\"mailto:jobs@civey.com\">jobs@civey.com</a>. Or learn more about Civey and its team at <a href=\"http://t3u1.mjt.lu/lnk/AMwAAKCTIpAAAAAAAAAAAG3sWXAAAAAA-nQAAAAAAAZPNgBgj73iGHcqtsfGQeuTzv6vQfq6YAAGCXo/3/D4xbqEL2uzpX3WRXlHQNiQ/aHR0cDovL3d3dy5jaXZleS5jb20vdWViZXItY2l2ZXkvam9icy11bmQtdGVhbQ\">www.civey.com/ueber-civey/jobs-und-team</a>.</p>\n<p><img src=\"https://camo.githubusercontent.com/214ca06c67c59aca8fa1c7a8f579a5d674816e60/68747470733a2f2f742e676f686972696e672e636f6d2f682f37333037313636393535356637643033643535386634646562353161646333623630666464396637656530393236343865396561646134393938303866383466\"></p>\n",
        "how_to_apply": "<p><a href=\"https://t.gohiring.com/h/73d6a003b49d5745e59850ec423cb707f3c3978d72a12ed4fcd874c6e27692e9\">application form</a></p>\n",
        "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb09pIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d5cb13026fa0a09eb93feb4916cd9524c83f4177/Civey%20GmbH.png"
    },
    "1": {
        ...
    }
```

---
