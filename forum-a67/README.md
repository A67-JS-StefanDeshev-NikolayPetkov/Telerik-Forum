# BGMount Forum

BGMount forum project. A react based forum on the topic of mountains in Bulgaria.

Project sketch: https://excalidraw.com/#room=402cbb51f267efb23328,kJrSGkMn-nG46sxJVEMs4A

Dependencies:
Vite - used to build React project
React Router - used to simulate multi-page behavior
libphonenumber-js - validates phone numbers
react-phone-input-2 - formats phone numbers and shows which country they're from

Registration form requirements:

First name: 4-32 characters, only letters allowed
Last name: 4-32 characters, only letters allowed
Username: 3-20 characters, letters, numbers and \_ allowed
Email: valid email format
Password: 8 characters, at least one upper and lowercase letter, one number and symbol
Number: valid phone number

Database structure:

📂 Database Root
├── 📁 posts
│ ├── 📄 postID
│ │ ├── author
│ │ ├── body
│ │ ├── createdOn
│ │ ├── id
│ │ ├── title
│ │ ├── commentCount
│ │ ├── likeCount
│
├── 📁 users
│ ├── 📄 username
│ │ ├── createdOn
│ │ ├── email
│ │ ├── firstName
│ │ ├── lastName
│ │ ├── number
│ │ ├── uid
│ │ ├── admin: true
│
├── 📁 comments
│ ├── 📄 commentID
│ │ ├── postID
│ │ ├── author
│ │ ├── body
│ │ ├── createdOn
│
├── 📁 postLikes
│ ├── 📄 postID
│ │ ├── userID: true
│
├── 📁 commentLikes
│ ├── 📄 commentID
│ │ ├── userID: true
