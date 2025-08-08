# Work Plan: Free-Text Spotify Playlist Creator

This work plan is designed for an incremental and quality-focused development process. Each milestone delivers a verifiable piece of functionality, ensuring steady progress and a high-quality final product that reflects professional pride.

## Milestone 0: Foundation & Setup

*Goal: Establish a robust project foundation with professional-grade tooling.*

*   [x] **Initialize Project:** Use a modern frontend boilerplate like `Vite` with a React template for a fast development experience (`npm create vite@latest my-spotify-app -- --template react-ts`).

*   [x] **Code Quality Tooling:**
    *   [x] Set up ESLint to enforce code style and catch errors early.
    *   [x] Set up Prettier to ensure consistent code formatting across the project.
    *   [ ] Configure these tools to run automatically on save and before commits (using husky is recommended).
*   [x] **Project Structure:** Create a logical directory structure (e.g., `/src/components`, `/src/services`, `/src/hooks`, `/src/styles`).
*   [ ] **Spotify App Registration:** Register the application on the Spotify Developer Dashboard to get the `Client ID` and `Client Secret`.

## Milestone 1: UI Shell

*Goal: Create a complete, but non-functional, user interface.*

*   [x] **Component Scaffolding:** Build the static React components for the main UI: `PlaylistForm`, `SongListInput`, and `CreatePlaylistButton`.
*   [x] **Styling:** Apply CSS (e.g., using CSS Modules or a framework like Tailwind CSS) to match the visual design described in the PRD—clean, modern, and responsive.
*   [x] **Layout:** Assemble the components into a responsive single-page layout that works well on both desktop and mobile.
*   **Verification:** The complete UI is visible and responsive, though no buttons or inputs are functional yet.

## Milestone 2: User Authentication

*Goal: Enable users to securely log in with their Spotify account.*

*   [ ] **OAuth Implementation:** Implement the Spotify OAuth 2.0 Authorization Code Flow.
*   [ ] **State Management:** Add state management (e.g., React Context or Zustand) to handle the user's authentication status and access token.
*   [ ] **Login/Logout Flow:**
    *   The "Create Playlist" button should now trigger the Spotify login flow if the user is not authenticated.
    *   Display the user's logged-in status on the UI.
    *   Implement a way for the user to log out.
*   **Security:** Ensure the access token is handled securely within the application's state and never exposed.
*   **Verification:** A user can click a login button, be redirected to Spotify, authorize the app, be redirected back, and see their logged-in status.

## Milestone 3: Core Feature - Playlist Creation

*Goal: Allow a logged-in user to create a new, empty playlist.*

*   [ ] **API Service:** Create a dedicated service file (`src/services/spotifyAPI.ts`) to encapsulate all `fetch` calls to the Spotify API.
*   [ ] **Wire Up Form:** Connect the `PlaylistForm` inputs (name, description, public/private) to the application's state.
*   [ ] **Implement Playlist Creation:** Use the authenticated user's token to make an API call that creates a new, empty playlist with the details from the form.
*   [ ] **Basic Feedback:** Provide simple feedback to the user (e.g., a browser `alert()`) on success or failure.
*   **Verification:** A logged-in user can fill out the form, click the create button, and see a new empty playlist appear in their Spotify account.

## Milestone 4: Song Processing & Playlist Population

*Goal: Implement the application's main feature: parsing text and adding songs to the playlist.*

*   [ ] **Parsing Logic:** Write a robust function to parse the raw text from the `SongListInput` into a clean array of song queries.
*   [ ] **Track Search:** Implement the API call to search for each song from the parsed list.
*   [ ] **Add Tracks to Playlist:** Implement the API call to add the found song URIs to the newly created playlist.
*   [ ] **End-to-End Logic:** Tie all the steps together: authenticate -> create playlist -> parse songs -> search tracks -> add tracks.
*   **Verification:** The application's core feature is now fully functional. A user can create a complete playlist with tracks from a pasted list.

## Milestone 5: Polishing & User Experience

*Goal: Make the application robust, intuitive, and enjoyable to use.*

*   [ ] **Loading States:** Add loading indicators to the UI while API calls are in progress to provide feedback to the user.
*   [ ] **Error Handling:** Implement comprehensive, user-friendly error handling (e.g., "Song not found," "Invalid playlist name," "API rate limit exceeded"). Display these errors gracefully in the UI.
*   [ ] **Success State:** Create a clear success message that appears after a playlist is created, including a direct link to the new playlist on Spotify.
*   [ ] **Testing:** Write unit tests for critical logic, especially the song parsing function.
*   **Verification:** The application feels professional and handles all common scenarios gracefully.

## Milestone 6: Finalization & Deployment

*Goal: Prepare the application for public release.*

*   [ ] **Final Testing:**
    *   Conduct thorough end-to-end manual testing across different browsers.
    *   Write integration tests (mocking the Spotify API) for the main user flow.
*   [ ] **Documentation:** Update the `README.md` with final, clear instructions for local setup and a description of the finished product.
*   [ ] **Deployment Configuration:**
    *   Choose a hosting provider (e.g., Vercel, Netlify).
    *   Configure the build process and set up environment variables for the Spotify `Client ID` and `Client Secret`.
*   [ ] **CI/CD:** Set up a continuous integration/continuous deployment pipeline to automate future deployments from the Git repository.
*   **Verification:** The application is live on a public URL and can be used by anyone.
