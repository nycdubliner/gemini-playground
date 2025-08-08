# Product Requirements Document: Free-Text Spotify Playlist Creator

## 1. Introduction

This document outlines the product requirements for a standalone web application that allows users to create Spotify playlists from a free-text list of songs. The target audience is any Spotify user who wants a quicker way to create playlists from sources like concert setlists, festival lineups, or copied-and-pasted lists from friends. The primary problem this application solves is the tediousness of manually searching for and adding individual tracks to a new playlist on Spotify.

## 2. Goals and Objectives

*   **Primary Goal:** To provide a simple, fast, and intuitive way for users to create a Spotify playlist from a list of songs in plain text.
*   **User Experience Goal:** To create a seamless and straightforward user experience, minimizing the number of clicks and cognitive load required to create a playlist.
*   **Security Goal:** To ensure the user's Spotify account is handled securely, with clear and transparent authentication, and to never perform destructive actions (like deleting or overwriting data).

## 3. Features

### 3.1. Playlist Details Input

*   **Playlist Name:** A text input field for the user to name their new playlist.
*   **Playlist Description:** A text area for the user to add an optional description to their playlist.
*   **Public/Private Toggle:** A switch or radio button to allow the user to set the playlist as public or private.

### 3.2. Song List Input

*   A large text area where users can paste or type a list of songs. The application should be able to parse song titles and, if provided, artist names from each line.

### 3.3. Playlist Creation

*   **"Create Playlist" Button:** A primary call-to-action button that initiates the playlist creation process.
*   **Spotify Authentication:** When the "Create Playlist" button is pressed, if the user is not already authenticated with Spotify, the application will initiate the Spotify OAuth flow to get the necessary permissions. The application will only request the minimum required scopes to create and modify playlists.
*   **Song Matching:** The application will parse the free-text song list and search the Spotify API for each song to find the correct track ID. The matching logic should be robust enough to handle minor variations in spelling or formatting.
*   **Playlist Generation:** Once the tracks are identified, the application will create a new playlist in the user's Spotify account with the specified name, description, and privacy setting, and then add the matched songs to it.

## 4. User Flow

1.  The user opens the web application.
2.  The user is presented with a simple form containing fields for "Playlist Name", "Playlist Description", a "Public/Private" toggle, and a text area for the song list.
3.  The user fills in the desired playlist attributes.
4.  The user pastes or types a list of songs into the text area (e.g., one song per line).
5.  The user clicks the "Create Playlist" button.
6.  If the user is not authenticated, a Spotify login and authorization screen appears. The user logs in and grants permission.
7.  The application processes the song list, finds the tracks on Spotify, creates the new playlist, and adds the tracks.
8.  The user receives a confirmation message that the playlist has been created, with a link to the new playlist on Spotify.

## 5. Design and UX

*   **Visual Style:** The application's color palette and typography will be inspired by the Spotify web client to create a sense of familiarity, but it will not use any of Spotify's official branding, logos, or icons. The design will be clean, modern, and minimalist.
*   **Layout:** A single-page application layout with a clear and focused form. No unnecessary navigation or clutter.
*   **Responsiveness:** The application will be fully responsive and usable on both desktop and mobile web browsers.

## 6. Non-Goals (Out of Scope)

*   **Editing Existing Playlists:** The application will **never** modify or overwrite an existing playlist in a user's Spotify account.
*   **Deleting Content:** The application will **never** delete any content (playlists, tracks, etc.) from a user's Spotify account.
*   **Playlist Management:** The application will not provide any features for managing existing playlists (e.g., renaming, deleting, reordering tracks). Its sole purpose is creation.
*   **User Accounts:** The application will not have its own user account system. Authentication will be handled entirely through Spotify's OAuth.

## 7. Assumptions

*   Users will have an active Spotify account.
*   The Spotify API will be available and accessible.
*   Users will provide song lists in a reasonably parsable format (e.g., one song per line).

## 8. Success Metrics

*   **Number of playlists created:** The primary measure of the application's usage and utility.
*   **User satisfaction:** Measured through optional feedback forms or surveys.
*   **Conversion rate:** The percentage of users who land on the page and successfully create a playlist.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```