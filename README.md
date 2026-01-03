# TalentIQ 🚀

A real-time collaborative coding platform that enables developers to solve coding problems together through video calls, live chat, and synchronized code editing. Perfect for technical interviews, pair programming, and collaborative problem-solving sessions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Key Components](#key-components)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **Real-time Video Calls**: High-quality video conferencing powered by Stream.io
- **Live Chat Integration**: In-session messaging with participants
- **Collaborative Code Editor**: Monaco-based editor with syntax highlighting for multiple languages
- **Code Execution**: Run code in real-time using Piston API
- **Problem Library**: Curated collection of coding problems with varying difficulty levels
- **Session Management**: Create, join, and manage collaborative coding sessions
- **User Authentication**: Secure authentication using Clerk
- **Responsive Dashboard**: Track active sessions, recent activities, and statistics
- **Mobile Detection**: Optimized mobile experience with dedicated mobile view

### Advanced Features
- **Multi-language Support**: JavaScript, Python, Java, C++, and more
- **Resizable Panels**: Customizable workspace layout
- **Real-time Participant Tracking**: See who's in the session
- **Session History**: View and track past coding sessions
- **Problem Filtering**: Filter problems by difficulty and category
- **Toast Notifications**: Real-time feedback using react-hot-toast
- **Background Processing**: Inngest for handling async operations

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.2.0 with Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 4.1 + DaisyUI
- **State Management**: TanStack React Query
- **Authentication**: Clerk React SDK
- **Video/Chat**: Stream.io Video & Chat SDKs
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios
- **UI Components**: Lucide React icons
- **Additional Libraries**: 
  - Canvas Confetti (celebrations)
  - React Snowfall (visual effects)
  - React Resizable Panels
  - Date-fns (date formatting)

### Backend
- **Runtime**: Node.js with Express 5.2
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk Express SDK
- **Video/Chat**: Stream.io Node SDK
- **Security**: Helmet, CORS
- **Validation**: Express Validator
- **Logging**: Winston + Morgan
- **Background Jobs**: Inngest
- **Environment**: dotenv

## 📁 Project Structure

```
talentIQ/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api/            # API service layer
│   │   │   └── session.js  # Session API calls
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # React components
│   │   │   ├── ActiveSessions.jsx      # Active sessions display
│   │   │   ├── CodeEditor.jsx          # Monaco code editor
│   │   │   ├── CreateSessionModal.jsx  # Session creation modal
│   │   │   ├── Features.jsx            # Features showcase
│   │   │   ├── Hero.jsx                # Landing page hero
│   │   │   ├── Loader.jsx              # Loading spinner
│   │   │   ├── Navbar.jsx              # Main navigation
│   │   │   ├── NavbarForProblems.jsx   # Problems page nav
│   │   │   ├── OutputPanel.jsx         # Code output display
│   │   │   ├── ProblemDescription.jsx  # Problem details
│   │   │   ├── RecentSessions.jsx      # Recent sessions list
│   │   │   ├── StatsCards.jsx          # Dashboard statistics
│   │   │   ├── VideoCallUI.jsx         # Video call interface
│   │   │   └── WelcomeSection.jsx      # Welcome message
│   │   ├── data/
│   │   │   └── problems.js  # Coding problems dataset
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useDevice.js        # Device detection
│   │   │   ├── useSession.js       # Session management
│   │   │   └── useStreamClient.js  # Stream.io client setup
│   │   ├── lib/            # Third-party integrations
│   │   │   ├── axios.js    # Axios configuration
│   │   │   ├── piston.js   # Code execution API
│   │   │   └── stream.js   # Stream.io configuration
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── MobilePage.jsx     # Mobile view
│   │   │   ├── NotfoundPage.jsx   # 404 page
│   │   │   ├── Problempage.jsx    # Individual problem view
│   │   │   ├── ProblemsPage.jsx   # Problems list
│   │   │   └── SessionPage.jsx    # Active session page
│   │   ├── utils/
│   │   │   └── utils.js    # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Global styles
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── vercel.json         # Vercel deployment config
│   └── tailwind.config.js  # Tailwind configuration
│
└── server/                  # Express backend server
    ├── src/
    │   ├── config/         # Configuration files
    │   │   ├── db_config.js      # MongoDB connection
    │   │   └── stream_config.js  # Stream.io setup
    │   ├── controllers/    # Request handlers
    │   │   ├── chatController.js    # Chat token generation
    │   │   └── sessionController.js # Session CRUD operations
    │   ├── lib/           # Core libraries
    │   │   ├── env.js     # Environment validation
    │   │   └── inngest.js # Background job setup
    │   ├── middlewares/   # Express middlewares
    │   │   └── protectRoute.js # Authentication middleware
    │   ├── models/        # MongoDB schemas
    │   │   ├── session.model.js # Session model
    │   │   └── user_model.js    # User model
    │   ├── routes/        # API routes
    │   │   ├── chatRoute.js     # Chat endpoints
    │   │   └── sessionRoute.js  # Session endpoints
    │   ├── utils/
    │   │   └── logger.js  # Winston logger configuration
    │   └── server.js      # Express app entry point
    ├── logs/              # Application logs
    ├── .env               # Environment variables
    ├── package.json       # Dependencies
    └── vercel.json        # Vercel deployment config
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

### Required Service Accounts

You'll need accounts and API keys from:

1. **Clerk** - For authentication ([clerk.com](https://clerk.com))
2. **Stream.io** - For video and chat ([getstream.io](https://getstream.io))
3. **MongoDB Atlas** - For database (if not using local MongoDB)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/talentIQ.git
cd talentIQ
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## 🔐 Environment Variables

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API URL
VITE_API_URL=http://localhost:3000

# Stream.io
VITE_STREAM_API_KEY=your_stream_api_key
```

### Backend (.env)

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/talentiq
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/talentiq

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream.io
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Getting API Keys

#### Clerk Setup
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the Publishable Key and Secret Key from the dashboard
4. Enable Email/Password authentication

#### Stream.io Setup
1. Go to [getstream.io](https://getstream.io) and sign up
2. Create a new app
3. Navigate to Dashboard and copy:
   - API Key
   - API Secret
4. Enable Video & Chat features

#### MongoDB Setup
1. For local: Install MongoDB and run `mongod`
2. For Atlas:
   - Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a cluster
   - Get connection string from "Connect" button
   - Replace `<password>` and database name in connection string

## 🏃 Running the Application

### Development Mode

#### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3000`

#### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production

```bash
cd server
npm start
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected routes require authentication via Clerk. The `Authorization` header with a valid Clerk session token must be included.

### Endpoints

#### Health Check
```http
GET /health
```
Returns server health status.

---

#### Chat Routes

**Get Stream Token**
```http
GET /api/chat/token
Authorization: Required
```
Returns a Stream.io authentication token for the current user.

**Response:**
```json
{
  "token": "eyJhbGc...",
  "userId": "user_123"
}
```

---

#### Session Routes

**Create Session**
```http
POST /api/sessions
Authorization: Required
Content-Type: application/json

Body:
{
  "problem": "two-sum",
  "difficulty": "easy"
}
```

**Response:**
```json
{
  "session": {
    "_id": "session_id",
    "problem": "two-sum",
    "difficulty": "easy",
    "host": "user_id",
    "status": "active",
    "callId": "call_id",
    "createdAt": "2026-01-03T...",
    "updatedAt": "2026-01-03T..."
  }
}
```

---

**Get Active Sessions**
```http
GET /api/sessions/active
Authorization: Required
```

Returns all currently active sessions.

---

**Get My Recent Sessions**
```http
GET /api/sessions/my-recent
Authorization: Required
```

Returns the current user's recent sessions.

---

**Get Session by ID**
```http
GET /api/sessions/:id
Authorization: Required
```

Returns details of a specific session.

---

**Join Session**
```http
POST /api/sessions/:id/join
Authorization: Required
```

Adds the current user as a participant to the session.

---

**End Session**
```http
POST /api/sessions/:id/end
Authorization: Required
```

Marks a session as completed (only host can end).

---

#### Inngest Endpoint
```http
POST /api/inngest
```

Internal endpoint for Inngest background job processing.

## 🧩 Key Components

### Frontend Components

#### **CodeEditor.jsx**
- Monaco-based code editor with multi-language support
- Real-time syntax highlighting
- Language switcher dropdown
- Code execution trigger

#### **VideoCallUI.jsx**
- Stream.io video call interface
- Participant count display
- Integrated chat sidebar
- Call controls (mute, video, screen share, leave)
- Speaker layout view

#### **ProblemDescription.jsx**
- Displays problem statement
- Shows examples and constraints
- Difficulty badge
- Category tags

#### **CreateSessionModal.jsx**
- Modal for creating new sessions
- Problem selection
- Difficulty filter

#### **Dashboard.jsx**
- User statistics cards
- Active sessions list
- Recent sessions history
- Navigation to problems

### Backend Controllers

#### **sessionController.js**
- `createSession`: Creates a new coding session with Stream.io call
- `getActiveSessions`: Retrieves all active sessions
- `getMyRecentSessions`: Gets user's session history
- `getSessionById`: Fetches specific session details
- `joinSession`: Adds participant to session
- `endSession`: Completes a session

#### **chatController.js**
- `getStreamtoken`: Generates Stream.io authentication token for users

### Custom Hooks

#### **useStreamClient.js**
- Initializes Stream.io video and chat clients
- Handles client connection and disconnection
- Returns configured clients for video and chat

#### **useSession.js**
- Manages session state
- Provides session CRUD operations
- Handles session API calls

#### **useDevice.js**
- Detects mobile devices
- Returns responsive breakpoint status

## 📦 Deployment

### Frontend Deployment (Vercel)

The frontend is configured for Vercel deployment with `vercel.json`:

```bash
cd frontend
vercel --prod
```

### Backend Deployment (Vercel)

The backend is also configured for Vercel:

```bash
cd server
vercel --prod
```

**Important:** Update CORS settings in `server.js` to include your production frontend URL.

### Environment Variables in Production

Remember to set all environment variables in your deployment platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add all variables from your `.env` files
3. Redeploy the application

### MongoDB Atlas for Production

Ensure your MongoDB Atlas cluster:
1. Has proper IP whitelist (or allow all: `0.0.0.0/0`)
2. Has a database user with read/write permissions
3. Connection string is updated in production environment variables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Use ESLint rules defined in `eslint.config.js`
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running locally or check your Atlas connection string.

---

**Clerk Authentication Fails**
```
Clerk: Invalid publishable key
```
**Solution:** Verify your Clerk keys are correctly set in `.env` and match your Clerk dashboard.

---

**Stream.io Connection Issues**
```
StreamChat: Invalid token
```
**Solution:** Check Stream.io API key and secret. Ensure backend `/api/chat/token` endpoint is accessible.

---

**Code Execution Not Working**
```
Piston API timeout
```
**Solution:** Check internet connection. Piston API may be rate-limited or down.

---

**CORS Errors**
```
Access-Control-Allow-Origin error
```
**Solution:** Ensure your frontend URL is added to CORS whitelist in `server.js`.

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

Created with ❤️ by the TalentIQ Team

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [Stream.io](https://getstream.io) - Video and Chat
- [Piston](https://github.com/engineer-man/piston) - Code Execution
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor
- [MongoDB](https://www.mongodb.com) - Database
- [Vercel](https://vercel.com) - Deployment

---

## 📞 Support

For support, email support@talentiq.com or join our Discord community.

## 🗺️ Roadmap

- [ ] Add more programming languages
- [ ] Implement whiteboard feature
- [ ] Add code review and feedback system
- [ ] Integrate with GitHub
- [ ] Add session recording and playback
- [ ] Implement team workspaces
- [ ] Add difficulty-based ranking system
- [ ] Mobile app (React Native)

---

**Made with ❤️ for developers, by developers**