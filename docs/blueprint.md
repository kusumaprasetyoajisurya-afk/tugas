# **App Name**: VideoVerse

## Core Features:

- User Authentication: Implement user authentication using Firebase Authentication (email/password).
- Auth Page: Create a single /auth page for user registration and login.
- Protected Routes: Automatically redirect non-authenticated users to /auth from protected pages.
- Logout Button: Implement a 'Log Out' button visible only to authenticated users.
- Video List Display: Display a list of videos (title, URL) from Firebase Realtime Database on the main page.
- Add Video Form: Allow authenticated users to add new videos (title, URL) to the Firebase Realtime Database.
- Firebase Initialization: Set up Firebase app initialization in lib/firebase.js, ready for configuration from the Firebase console.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) for a focused viewing experience.
- Background color: Light Gray (#E8EAF6), a desaturated version of Indigo, for comfortable viewing.
- Accent color: Violet (#9575CD) for interactive elements and highlights, providing contrast without distraction.
- Body and headline font: 'Inter' sans-serif for a modern and readable interface.
- Use minimalist icons for video controls and user actions.
- Clean and organized layout with video list taking center stage.
- Subtle transitions and animations on video load and form submission.