# Social Media App (MERN Stack)
This social media app and    is built using the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to create accounts, log in, update their profiles with a bio and profile picture, search for other users, follow/unfollow them, view posts from those they follow, create various types of posts (text, images, videos), interact with posts through likes, dislikes, comments, and engage in real-time chat with other users.

## Key-Features
- Account Management: User registration, login, and logout functionality.
- Profile Customization: Update profile information including bio and profile photo.
- User Discovery: Search for users and manage follow/unfollow.
- Content Creation: Create, view, like, unlike, and comment on posts (supports text, images, and videos).
- Personalized Feed: View posts from followed users.
- Messaging: Chat with other registered users.

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB (local or remote)

## Environment Variables
Create .env file in the root directory and include the following configuration:
```
PORT=...
MONGO_URL=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Steps to Setup
1. Clone the repository:
```
git clone https://github.com/DevanshiSinghal/Aries-Project
```

2. Install frontend dependencies:
```
cd your-repo/frontend
npm install
```

3. Install backend dependencies:
```
cd ../backend
npm install
```

4. Start the backend server:
```
node server.js
```

5. Start the frontend development server:
```
cd ../frontend/src
npm run dev
```

Your application should now be running locally, and you can access it through your browser.

Ensure to replace the placeholders in the .env file with your actual values. Follow the steps in the given order to set up and run the project successfully.
