# MMORPG Themed Blog Website - MMO Insider

A comprehensive blog platform for MMORPG enthusiasts. Features include authentication, email verification, post management, upvoting/downvoting posts, pagination, search functionality, user management through an admin panel, and profile customization.

## Key Tech Stack

- React
- Redux Saga
- Express
- Sequelize (MySQL)

## Frontend Setup

1. Install dependencies:

```
npm install
```

2. Start the application:

```
npm run start
```

## Backend Setup

1. Install dependencies:

```
npm install
```

2. Create the database:

```
npx sequelize-cli db:create
```

3. Migrate the database:

```
npx sequelize-cli db:migrate
```

4. Seed the database (initial data from [MMOBomb Latest News](https://www.mmobomb.com/api1/latestnews)):

```
npx sequelize-cli db:seed:all
```

5. Start the development server:

```
npm run dev
```

## Environment Variables

For the system to function correctly, you'll need to set up several environment variables.

### Backend `.env` Configuration

```
PORT=8080
SECRET_KEY="dUKG6*&kvD5%$v23r"
EMAIL_ADDRESS="your_email"
PASSWORD="code_from_node_mailer"
BACKEND_BASE_URL="http://localhost:8080"
FRONTEND_BASE_URL="http://localhost:3000"
```

### Frontend `.env` Configuration

```
VITE_API_BASE_URL=http://localhost:8080
```

## Features

- **Authentication & Authorization:** Secure user login and signup.
- **Email Verification & Forgot Password:** Integrated with Nodemailer.
- **Post Management:** Create, edit, and delete blog posts. Supports image uploads for post thumbnails using Multer.
- **Upvote/Downvote System:** Users can upvote or downvote posts.
- **Pagination & Search:** Browse posts with pagination and search by title or description.
- **Admin Panel:** Manage users and view detailed user information.
- **Profile Management:** Users can update their profile information and avatars.

---

# Server Endpoints

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "error": "Internal Server Error"
}
```

_Response (400 - Authentication Error)_

```
{
  "error": "User is not authenticated"
}
```

_Response (403 - Admin Authorization Error)_

```
{
  "error": "Access forbidden. Admin authorization required."
}
```

---

# RESTful Endpoints

## User Endpoints

### POST api/user/register

> User registration

_Request Header_

```
not needed
```

_Request Body_

```
{
  "username": "<username>",
  "email": "<email>",
  "password": "<password>"
}
```

_Response (201)_

```
{
  "id": <user_id>,
  "username": "<username>",
  "email": "<email>",
  "role": 2,
  "isEmailVerified": false
}
```

_Response (400)_

```
{
  "message": "Username or email already exists"
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<input_field> is required"
}
{
  "message": "Email must be a valid email"
}
```

---

### POST api/user/login

> User login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (201)_

```
{
  "token": "<token>",
  "message": "Login Successful!"
}
```

_Response (400)_

```
{
  "message": "Invalid email or password."
}
```

_Response (403)_

```
{
  "message": "Your email address is not verified. Please check your email for the verification link."
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<input_field> is required"
}
{
  "message": "Email must be a valid email"
}
```

---

### GET api/user/verify-email

> Verify user's email

_Request Header_

```
not needed
```

_Request Query_

```
{
  "token": "<verification_token>"
}
```

_Response (Redirect)_

```
Redirects to FRONTEND_BASE_URL/verify-success
```

_Response (400)_

```
{
  "message": "Invalid token."
}
```

---

### GET api/user

> Get all users

_Request Header_

```
Authorization: Bearer <token>
```

_Response (200)_

```
[
  {
    "id": <user_id>,
    "username": "<username>",
    "email": "<email>",
    ...
  },
  ...
]
```

---

### GET api/user/profile

> Get user profile by ID

_Request Header_

```
Authorization: Bearer <token>
```

_Response (200)_

```
{
  "email": "<email>",
  "username": "<username>",
  "role": <role>,
  "avatar": "<avatar_url>",
  "bio": "<bio>"
}
```

_Response (404)_

```
{
  "message": "User not found."
}
```

---

### GET api/user/:username

> Get user profile by username

_Request Header_

```
not needed
```

_Request Params_

```
{
  "username": "<username>"
}
```

_Response (200)_

```
{
  "user": {
    "id": <user_id>,
    "username": "<username>",
    "email": "<email>",
    "avatar": "<avatar_url>",
    "createdAt": "<creation_date>",
    "bio": "<bio>"
  }
}
```

_Response (404)_

```
{
  "message": "User not found."
}
```

---

### POST api/user/forgot-password

> Forgot Password

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email>"
}
```

_Response (200)_

```
Here's the continuation of your RESTful Endpoints documentation in Markdown format:

markdown

### POST api/user/forgot-password

> Forgot Password

_Request Header_

not needed


_Request Body_

{
"email": "<email>"
}

scss


_Response (200)_

{
  "message": "Temporary password sent via email"
}
```

_Response (404)_

```
{
  "message": "Email not registered."
}
```

---

### DELETE api/user/delete/:userId

> Delete User by ID

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```
{
  "userId": <user_id>
}
```

_Response (200)_

```
{
  "deletedUser": <deleted_user_info>,
  "message": "User deleted successfully."
}
```

_Response (404)_

```
{
  "message": "User not found."
}
```

---

### PUT api/user/profile/edit

> Edit User Profile

_Request Header_

```
Authorization: Bearer <token>
```

_Request Body_

```
{
  "username": "<username>",
  "email": "<email>",
  "bio": "<bio>",
  "avatar": "<avatar>"
}
```

_Response (200)_

```
{
  "user": <updated_user_info>,
  "message": "Profile updated successfully!"
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<validation_error_message>"
}
```

_Response (404)_

```
{
  "message": "User not found"
}
```

---

### POST api/user/change-password

> Change Password

_Request Header_

```
Authorization: Bearer <token>
```

_Request Body_

```
{
  "currentPassword": "<current_password>",
  "newPassword": "<new_password>"
}
```

_Response (200)_

```
{
  "message": "Password changed successfully"
}
```

_Response (401)_

```
{
  "message": "Current password is incorrect"
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<validation_error_message>"
}
```

---

## Post Endpoints

### GET api/post

> Get All Posts

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Response (200)_

```
[
  {
    "id": <post_id>,
    "title": "<title>",
    "shortDescription": "<short_description>",
    "mainImage": "<main_image>",
    "content": "<content>",
    "author": {
      "id": <author_id>,
      "username": "<username>",
      "email": "<email>",
      "avatar": "<avatar>"
    },
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  ...
]
```

---

### GET api/post/paginate

> Get Paginated Posts

_Request Header_

```
not needed
```

_Request Params_

```
{
  "page": <page_number>,
  "limit": <posts_per_page>
}
```

_Response (200)_

```
{
  "currentPage": <current_page>,
  "totalPages": <total_pages>,
  "totalPosts": <total_posts>,
  "posts": [
    <post_object>,
    ...
  ]
}
```

---

### GET api/post/user/:username

> Get Posts by User's Username

_Request Header_

```
not needed
```

_Request Params_

```
{
  "username": "<username>"
}
```

_Response (200)_

```
{
  "posts": [
    <post_object>,
    ...
  ]
}
```

_Response (404)_

```
{
  "message": "User not found."
}
```

---

### GET api/post/:postId

> Get Post by ID

_Request Header_

```
not needed
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Response (200)_

```
<post_object>
```

_Response (404)_

```
{
  "message": "Post not found."
}
```

---

### POST api/post

> Create Post

_Request Header_

```
Authorization: Bearer <token>
```

_Request Body_

```
{
  "title": "<title>",
  "shortDescription": "<short_description>",
  "content": "<content>",
  "mainImage": "<mainImage>"
}
```

_Response (201)_

```
{
  "post": <created_post_object>,
  "message": "Post created successfully!"
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<validation_error_message>"
}
```

---

### PUT api/post/:postId

> Edit Post by ID

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Request Body_

```
{
  "title": "<title>",
  "shortDescription": "<short_description>",
  "content": "<content>",
  "mainImage": "<main_image>"
}
```

_Response (200)_

```
{
  "post": <updated_post_object>,
  "message": "Post updated successfully!"
}
```

_Response (404)_

```
{
  "message": "Post not found or access denied"
}
```

_Response (400)_ - Joi Validation Error

```
{
  "message": "<validation_error_message>"
}
```

---

### DELETE api/post/:postId

> Delete Post by ID

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Response (200)_

```
{
  "message": "Post deleted successfully"
}
```

_Response (404)_

```
{
  "message": "Post not found or access denied"
}
```

---

### POST api/post/vote/:postId

> Vote on Post

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Request Body_

```
{
  "voteValue": <vote_value>
}
```

_Response (200)_

```
{
  "updatedPost": <updated_post_object>,
  "message": "Voted post."
}
```

_Response (400)_

```
{
  "message": "Error message"
}
```

---

## Comment Endpoints

### GET api/comment/:postId

> Get Comments by Post ID

_Request Header_

```
not needed
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Response (200)_

```
{
  "comments": [
    {
      "id": <comment_id>,
      "text": "<text>",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "userId": <user_id>,
      "postId": <post_id>,
      "user": {
        "username": "<username>",
        "avatar": "<avatar>"
      },
      "replies": [
        {
          // Comment Object with a non null parentId
        },
        ...
      ]
    },
  ...
  ]
}
```

---

### POST api/comment/:postId

> Create Comment on a Post

_Request Header_

```
Authorization: Bearer <token>
```

_Request Params_

```
{
  "postId": <post_id>
}
```

_Request Body_

```
{
  "text": "<text>",
  "parentId": <parent_comment_id> // Optional
}
```

_Response (201)_

```
{
  "comment": {
    "id": <comment_id>,
    "text": "<text>",
    "parentId": <parent_comment_id>,
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>",
    "userId": <user_id>,
    "postId": <post_id>,
    "user": {
      "username": "<username>",
      "avatar": "<avatar>"
    },
    "replies": []
  },
  "message": "Comment created successfully"
}
```

_Response (400)_ - Validation Error

```
{
  "message": "<validation_error_message>"
}
```
