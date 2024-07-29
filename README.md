# Backend Travenor

Backend Travenor adalah aplikasi backend yang menggunakan Node.js, Express.js, dan Passport.js untuk mengimplementasikan OAuth login dengan Facebook, Twitter, dan Instagram.

## Fitur

- **OAuth Login:**
  - Login dengan Google
  - Login dengan Facebook
  - Login dengan Twitter
  - Login dengan Instagram

## Instalasi

### Prasyarat

Pastikan Anda telah menginstal Node.js dan npm di sistem Anda.

1. Clone repository ini:

   ```bash
   git clone https://github.com/Rezavalovi/backend-travenor.git

   ```

2. Instal semua dependensi yang diperlukan menggunakan npm:

   ```bash
   cd backend-travenor/server
   npm install
   ```
   
3. Konfigurasi Environment

   ```bash
   PORT=3000
   FACEBOOK_CLIENT_ID=your_facebook_client_id
   FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
   FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
  
   TWITTER_CONSUMER_KEY=your_twitter_consumer_key
   TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
   TWITTER_CALLBACK_URL=http://localhost:3000/auth/twitter/callback
  
   INSTAGRAM_CLIENT_ID=your_instagram_client_id
   INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
   INSTAGRAM_CALLBACK_URL=http://localhost:3000/auth/instagram/callback
   ```

4. Jalankan aplikasi:

   ```bash
   npx nodemon App.js
   ```

## API Documentation

## Models

### User

```md
- username : string, required,
- email : string, required, unique
- password : string, required, length of password minimum 6
```

### Destination

```md
- name : text
- location : text
- rating : float
- price : float
- description : text
- imageUrl : text
```

### Favorite

```md
- userId : integer
- destinationId : integer
```

## Relationship

### One-to-Many

Relasi antara `User` & `Favorite`
Relasi antara `Destination` & `Favorite`

## Endpoints

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`
- `GET /users/auth/facebook`
- `GET /users/auth/facebook/callback`
- `GET /users/auth/twitter`
- `GET /users/auth/twitter/callback`
- `GET /users/auth/instagram`
- `GET /users/auth/instagram/callback`

Routes below need authentication:

- `PUT /users/profile/image`
- `GET /destination`
- `GET /destination/:id`
- `POST /destination`
- `PUT /destination/:id`
- `DELETE /destination/:id`
- `POST /favorite`
- `DELETE /favorite/:id`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

Response (201 - Created)

```json
{
  "username": "string",
  "email": "string",
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is already used"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email is invalid"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string",
  "id": "integer"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /google-login

Request:

- body:

```json
{
  "email": "string",
}
```

Response (200 - OK)

```json
{
  "goggle_token": "string"
}
```

## 3. GET /users

Get all user info

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "UserId": "integer"
}
```

Response (200 - OK)

```json
[
  {
        "username": "string",
        "email": "string",
        "profileImg": "string"
    },
    {
        "username": "string",
        "email": "string",
        "profileImg": "string"
    },
    {
        "username": "string",
        "email": "string",
        "profileImg": "string"
    }
  ...,
]
```

## 4. PUT /users/profile/image

Update user profile image

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>",
  "Content-Type": "multipart/form-data"
}
```

- body:

```json
{
  "profileImage": "<file>"
}
```

Response (200 - Success)

```json
{
  "status": 0,
  "message": "Update Profile Image berhasil",
  "data": {
    "id": "integer",
    "email": "string",
    "name": "string",
    "profileImg": "string"
}
```

Response (400 - Bad Request)

```json
{
  "status": 400,
  "message": "No image uploaded",
  "data": null
}
OR
{
  "status": 102,
  "message": "Format Image tidak sesuai",
  "data": null
}

```

Response (401- Unauthorize)

```json
{
  "status": 401,
  "message": "Token tidak valid atau kadaluwarsa",
  "data": null
}
OR
{
  "status": 500,
  "message": "Internal Server Error",
  "data": null
}

```

## 5. GET /destination

Get all destination

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
        "id": 1,
        "name": "Niladri Reservoir",
        "location": "Tekergat, Sunamgonj",
        "rating": 4.7,
        "price": 50,
        "description": "Niladri is famous for its breathtaking natural beauty and crystal-clear waters.",
        "imageUrl": "https://example.com/images/niladri-reservoir.jpg",
        "createdAt": "2024-07-28T23:55:12.646Z",
        "updatedAt": "2024-07-28T23:55:12.646Z"
    },
    {
        "id": 2,
        "name": "Darmang Lake",
        "location": "Dowal, Sunamgonj",
        "rating": 4.5,
        "price": 45,
        "description": "Darmang Lake is a serene place perfect for a quiet retreat.",
        "imageUrl": "https://example.com/images/darmang-lake.jpg",
        "createdAt": "2024-07-28T23:55:12.646Z",
        "updatedAt": "2024-07-28T23:55:12.646Z"
    },
    {
        "id": 3,
        "name": "Adiring Villa Resort",
        "location": "Bogor, Indonesia",
        "rating": 4.6,
        "price": 70,
        "description": "A luxurious villa resort with beautiful views and excellent amenities.",
        "imageUrl": "https://example.com/images/adiring-villa-resort.jpg",
        "createdAt": "2024-07-28T23:55:12.646Z",
        "updatedAt": "2024-07-28T23:55:12.646Z"
    },
    {
        "id": 4,
        "name": "Kachura Resort",
        "location": "Skardu, Pakistan",
        "rating": 4.8,
        "price": 60,
        "description": "A popular resort with stunning mountain views and outdoor activities.",
        "imageUrl": "https://example.com/images/kachura-resort.jpg",
        "createdAt": "2024-07-28T23:55:12.646Z",
        "updatedAt": "2024-07-28T23:55:12.646Z"
    },
  ...,
] 
```

Response (401- Unauthorized)

```json
{
    "message": "Invalid token"
}
```

## 6. GET /destination/:id

Get destination by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
        "id": 1,
        "name": "Niladri Reservoir",
        "location": "Tekergat, Sunamgonj",
        "rating": 4.7,
        "price": 50,
        "description": "Niladri is famous for its breathtaking natural beauty and crystal-clear waters.",
        "imageUrl": "https://example.com/images/niladri-reservoir.jpg",
        "createdAt": "2024-07-28T23:55:12.646Z",
        "updatedAt": "2024-07-28T23:55:12.646Z"
    }
] 
```

Response (401- Unauthorized)

```json
{
    "message": "Invalid token"
}
```

## 7. POST /destination

add or create destination

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

-body:

```json
  {
    "name": "TEST 2",
		"location": "Jakarta",
		"rating": 4.5,
		"price": 45.0,
		"description": "Darmang Lake is a serene place perfect for a quiet retreat.",
		"imageUrl": "https://example.com/images/darmang-lake.jpg"
}
```

Response (200 - OK)

```json
{
    "message": "Destination Succes added",
    "data": {
        "id": 6,
        "name": "TEST 2",
        "location": "Jakarta",
        "rating": 4.5,
        "price": 45,
        "description": "Darmang Lake is a serene place perfect for a quiet retreat.",
        "imageUrl": "https://example.com/images/darmang-lake.jpg",
        "updatedAt": "2024-07-29T00:19:53.539Z",
        "createdAt": "2024-07-29T00:19:53.539Z"
    }
}
```

Response (401- Unauthorized)

```json
{
    "message": "Invalid token"
}
```

## 8. PUT /destination/:id

update destination by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:
```json
  "id": "integer"
```

-body:

```json
  {
    "name": "TEST 2",
		"location": "Jakarta",
		"rating": 5.5,
		"price": 50.0,
		"description": "Layla Lake is a serene place perfect for a quiet retreat.",
		"imageUrl": "https://example.com/images/darmang-lake.jpg"
  }
```

Response (200 - OK)

```json
{
    "message": "Destination Succes updated",
    "data": {
        "id": 6,
        "name": "TEST 2",
        "location": "Jakarta",
        "rating": 5.5,
        "price": 50,
        "description": "Layla Lake is a serene place perfect for a quiet retreat.",
        "imageUrl": "https://example.com/images/darmang-lake.jpg",
        "createdAt": "2024-07-29T00:19:53.539Z",
        "updatedAt": "2024-07-29T00:21:37.807Z"
    }
}
```

Response (401- Unauthorized)

```json
{
    "message": "Invalid token"
}
```


## 9. Delete /destination/:id

- Delete destination 

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Destination deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 10. POST /favorite

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "userId": "integer",
  "destinationId": "integer"
}

```

Response (200 - OK)

```json
{
  "message": "Favorite added",
  "data": {
    "id": "integer",
    "userId": "integer",
    "destinationId": "integer",
    "Destination": {
      "name": "string",
      "location": "string",
      "rating": "number",
      "price": "number",
      "description": "string",
      "imageUrl": "string"
    }
  }
}

```

Response (404 - Not Found)

```json
{
  "message": "userId and destinationId are required"
}
OR
{
  "message": "Favorite already exists"
}
```

Response (500 - Internal Server Error)
```json
{
  "message": "Internal Server Error"
}
```

## 11. DELETE /favorite/:id

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:
  ```json
  {
  "id": "integer"
  }
  ```

Response (200 - OK)

```json
{
  "message": "Favorite deleted"
}

```

Response (400 - Bad Request):

```json
{
  "message": "id is required"
}
```

Response (404 - Not Found):

```json
{
  "message": "Favorite not found"
}
```

Response (500 - Internal Server Error)
```json
{
  "message": "Internal Server Error"
}
```
