# ReelScroll - Next.js Video Sharing Platform

## 🚀 Introduction

A modern, full-stack video sharing application built with **Next.js 15**, **React 19**, and **TypeScript**. This platform allows users to upload, view, and interact with short-form video content in a seamless, responsive interface. It leverages **ImageKit** for high-performance video delivery and transformations, and **MongoDB** for robust data management.

## ✨ Key Features

-   **📱 Mobile-First Design**: Fully responsive UI built with **Tailwind CSS** and **DaisyUI**, providing an app-like experience on all devices.
-   **🔐 Secure Authentication**: Robust user registration and login system using **NextAuth.js** with **bcrypt** encryption.
-   **📹 Smart Video Management**:
    -   Seamless video uploads via **ImageKit**.
    -   Automatic video optimization and transformation.
    -   Intelligent thumbnail generation.
-   **🏎️ High Performance**:
    -   Server-side rendering (SSR) for fast initial loads.
    -   Optimized API routes for data fetching.
    -   Lazy-loading video feed.
-   **🎨 Modern UI/UX**:
    -   Staggered animations for the video feed.
    -   Real-time form validation and notifications.
    -   Clean, intuitive interface.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, DaisyUI
-   **Backend**: Next.js API Routes, Node.js
-   **Database**: MongoDB, Mongoose ODM
-   **Authentication**: NextAuth.js (v4)
-   **Media Services**: ImageKit.io
-   **Utilities**: React Hook Form, Lucide React, Bcrypt.js

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (Local or Atlas)
-   ImageKit Account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/reelscroll.git
    cd reelscroll
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

    # ImageKit
    NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to `http://localhost:3000` to see the app in action.

## 📂 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── api/             # Backend API routes (auth, videos)
│   │   ├── components/      # Reusable UI components (VideoFeed, UploadForm)
│   │   ├── (auth)/          # Authentication pages (login, register)
│   │   └── page.tsx         # Main landing page
│   ├── lib/                 # Utility functions (db connection, auth config)
│   ├── models/              # Mongoose data models (User, Video)
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── ...config files          # Next.js, Tailwind, ESLint configs
```

## 🔌 API Documentation

### Videos
-   `GET /api/videos`: Fetch all videos (sorted by newest).
-   `POST /api/videos`: Create a new video entry (Protected).

### Auth
-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/signin`: Sign in.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
