# byteConnect - Social Media webApp

This social media application is built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a platform for users to manage accounts, interact with posts, and engage in real-time messaging with other users.

# Features
## Account Management
- **User Registration**: Allows new users to create accounts securely.
- **User Authentication**: Provides login and logout functionalities with JWT tokens for secure access.

## Profile Customization
- **Profile Updates**: Users can personalize their profiles by adding a bio and uploading a profile picture.
- **Profile Viewing**: Displays user profiles with their details and posts.

## User Interaction
- **User Search**: Enables users to find and follow other users based on their usernames.
- **Follow/Unfollow**: Allows users to manage their social connections by following or unfollowing others.

## Content Sharing
- **Post Creation**: Supports creating posts with various media types such as text, images, and videos.
- **Post Interaction**: Users can like, unlike, and comment on posts to engage with content.

## Personalization
- **Customized Feed**: Displays a personalized feed of posts from users that the current user follows.
- **Recommendations**: Provides suggestions for new connections and content based on user interactions.

## Messaging
- **Real-time Chat**: Facilitates instant messaging between registered users in real-time.
- **Message History**: Stores chat history and displays previous conversations for reference.

## Setup Instructions


## Environment Variables
Create a `.env` file in the root directory and add the following configuration:
```
PORT=... // Port number for the server
MONGO_URL=... // MongoDB connection URL
JWT_SECRET=... // Secret key for JWT token
CLOUDINARY_CLOUD_NAME=... // Cloudinary cloud name for image and video storage
CLOUDINARY_API_KEY=... // Cloudinary API key
CLOUDINARY_API_SECRET=... // Cloudinary API secret
```


## Steps to Setup
1. **Clone the repository**: ``` git clone https://github.com/ayushshankaram/byteConnect ```
3. **Install frontend dependencies**:
 ```
 cd your-repo/frontend
 npm install
```


3. **Install backend dependencies**:
```cd ../backend
npm install
```

4. **Start the backend server**:
```
node server.js
```

5. **Start the frontend development server**:
```
cd ../frontend/src
npm run dev
```


After completing these steps, your application should be running locally. Access it through your web browser.

Replace the placeholders in the `.env` file with your actual values to ensure proper configuration. Follow the setup instructions in sequence to successfully run the project.



