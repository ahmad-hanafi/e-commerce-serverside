# API DOCUMENTATION

## POST/login

### > Request Body
note: when login admin
```JSON
{
 "email":"aman@kak.com",
 "password":"aman"
}
```
### > Response
#### - Success Response (200-OK) 
note : when successfully login admin
```JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbWFuQGthay5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjE4MzM4NTE5fQ.TE05WIEzVBcogA92JRrYO9lyc4mbTAXX9W9hFe8g1Ws"
}
```

## POST/login
note: when login customer

### > Request Body
```JSON
{
 "email":"budi2@mail.com",
 "password":"budi"
}
```
### > Response
#### - Success Response (200-OK) 
note : when successfully login admin
```JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```

## POST/register

### > Request Body
note: when register Admin
```JSON
{
 "email":"aman@kak.com",
 "password":"aman",
 "roles":"admin"
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully register
```JSON
{
        "id":"1",
        "email": "aman@kak.com",
        "roles": "admin"
}
```

## POST/register

### > Request Body
note: when register Customer
```JSON
{
 "email":"budi@mail.com",
 "password":"budi"
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully register
```JSON
{
        "id":"2",
        "email": "budi@mail.com",
        "roles": "Customer"
}
```

---

## POST/products

### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbWFuQGthay5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjE4MzM1ODA1fQ.3WF3g9X9gqfPXX_7P0Ts8jAvwwYaGqixMUuQ7oNpyRE"
}
```
### > Request Body
```JSON
{
 "name": "Realme Narzo 30A",
 "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/realme_narzo_30A/realme_narzo_30A_L_1.jpg",
 "price": 2350000,
 "stock": 8
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully created
```JSON
{
    "id": 3,
    "name": "Realme Narzo 30A",
    "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/realme_narzo_30A/realme_narzo_30A_L_1.jpg",
    "category": null,
    "price": 2350000,
    "stock": 8,
    "updatedAt": "2021-04-13T17:52:54.153Z",
    "createdAt": "2021-04-13T17:52:54.153Z"
}
```

---

## PUT/products/:id
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbWFuQGthay5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjE4MzM1ODA1fQ.3WF3g9X9gqfPXX_7P0Ts8jAvwwYaGqixMUuQ7oNpyRE"
}
```
### > Request Params
```JSON
"id": 3
```
### > Request Body

```JSON
{
 "name" : "Beras Delanggu C4 5kg",
 "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/7/6/cca19957-6197-489c-bc8a-17130aa452a5.jpg",
 "price": 54900,
 "stock": 8,
 "category" : "Lokal"
}
```

### > Response
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
{
    "message": "Succeess Update"
}
```

## PATCH/products/:id
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbWFuQGthay5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjE4MzM1ODA1fQ.3WF3g9X9gqfPXX_7P0Ts8jAvwwYaGqixMUuQ7oNpyRE"
}
```
### > Request Params
```JSON
"id": 1
```
### > Request Body

```JSON
{
 "stock" : 10
}
```

### > Response
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
[
    1,
    [
        {
            "id": 1,
            "name": "Beras bulog 5kg",
            "category": "Bulog",
            "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
            "price": 59500,
            "stock": 15,
            "createdAt": "2021-04-13T17:42:39.078Z",
            "updatedAt": "2021-04-13T17:59:13.306Z"
        }
    ]
]
```

## DELETE/products/:id
### > Response
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbWFuQGthay5jb20iLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjE4MzM1ODA1fQ.3WF3g9X9gqfPXX_7P0Ts8jAvwwYaGqixMUuQ7oNpyRE"
}
```
### > Request Params
```JSON
"id": 4
```
### > Request Body
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
{
    "message": "Product success to delete",
}
```

## GET /cart 
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```
### > Response
#### - Success Response (201) 
```JSON
[
    {
        "id": 1,
        "quantity": 3,
        "UserId": 2,
        "ProductId": 3,
        "createdAt": "2021-04-13T18:23:49.274Z",
        "updatedAt": "2021-04-13T18:26:51.945Z",
        "Product": {
            "id": 3,
            "name": "Beras Delanggu C4 5kg",
            "category": "Lokal",
            "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/7/6/cca19957-6197-489c-bc8a-17130aa452a5.jpg",
            "price": 54900,
            "stock": 8,
            "createdAt": "2021-04-13T17:52:54.153Z",
            "updatedAt": "2021-04-13T17:57:42.627Z"
        }
    },
    {
        "id": 2,
        "quantity": 1,
        "UserId": 2,
        "ProductId": 2,
        "createdAt": "2021-04-13T18:42:55.095Z",
        "updatedAt": "2021-04-13T18:42:55.095Z",
        "Product": {
            "id": 2,
            "name": "Beras bulog 15kg",
            "category": "Bulog",
            "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/9/27/9c156ef5-74cb-4c94-baa4-b672a1ae8373.jpg",
            "price": 135000,
            "stock": 10,
            "createdAt": "2021-04-13T17:42:39.078Z",
            "updatedAt": "2021-04-13T17:42:39.078Z"
        }
    }
]
```

## PATCH /cart 
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```

### > Request Body
### > Request Params
```JSON
"ProductId": 2
```
### > Response
#### - Success Response (200-OK) 
```JSON
{
    "id": 2,
    "UserId": 2,
    "ProductId": 2,
    "quantity": 1,
    "updatedAt": "2021-04-13T18:42:55.095Z",
    "createdAt": "2021-04-13T18:42:55.095Z"
}
```

## PATCH /cart/plus
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```
### > Request Body
```JSON
{
    "id": "1"
}
```

### > Response
#### - Success Response (200-OK) 

```JSON
[
    1,
    [
        {
            "id": 1,
            "quantity": 2,
            "UserId": 2,
            "ProductId": 3,
            "createdAt": "2021-04-13T18:23:49.274Z",
            "updatedAt": "2021-04-13T18:25:59.355Z"
        }
    ]
]
```

## PATCH /cart/min
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```
### > Request Body
```JSON
{
    "id": "1"
}
```
### > Response
#### - Success Response (200-OK) 

```JSON
[
    1,
    [
        {
            "id": 1,
            "quantity": 1,
            "UserId": 2,
            "ProductId": 3,
            "createdAt": "2021-04-13T18:23:49.274Z",
            "updatedAt": "2021-04-13T18:26:51.945Z"
        }
    ]
]
```


## DELETE /cart/:id 
### > Request Headers
```JSON
{
"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJidWRpQG1haWwuY29tIiwicm9sZXMiOiJDdXN0b21lciIsImlhdCI6MTYxODMzNzgzNX0.mhLjXE7VSqBk3PVnVOnJgVe13HQqDmxcXWSpM-HF9jM"
}
```
### > Request Params
```JSON
{
    "id": 1
}
```

### > Response
#### - Success Response (200) 
```JSON
{
    "message": "Product has been delete from the list"
}
```