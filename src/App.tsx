import { useState, useEffect } from 'react';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import SongListInput from './components/SongListInput/SongListInput';
import CreatePlaylistButton from './components/CreatePlaylistButton/CreatePlaylistButton';
import { useAuth } from './hooks/useAuth';
import { fetchProfile } from './services/spotify';
import './App.css';

function App() {
  const { isAuthenticated, isLoading, accessToken, login, logout } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const [songList, setSongList] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchProfile(accessToken)
        .then((profile) => {
          setUserId(profile.id);
        })
        .catch((error) => {
          console.error('Failed to fetch user profile:', error);
        });
    }
  }, [isAuthenticated, accessToken]);

  const handleSongListChange = (list: string) => {
    setSongList(list);
  };

  const handlePlaylistDetailsChange = (details: { name: string; description: string }) => {
    setPlaylistName(details.name);
    setPlaylistDescription(details.description);
  };

  const handlePlaylistCreated = (url: string) => {
    setPlaylistUrl(url);
  };

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Loading...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create a Spotify Playlist</h1>
        <p>Paste a list of songs and we'll make a playlist for you.</p>
        {isAuthenticated ? (
          <button onClick={logout} className="auth-button">Log Out</button>
        ) : (
          <button onClick={login} className="auth-button">Log In with Spotify</button>
        )}
      </header>
      <main className="App-main">
        {isAuthenticated ? (
          playlistUrl ? (
            <div className="success-message">
              <h2>Playlist Created!</h2>
              <p>Your playlist is ready on Spotify.</p>
              <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="playlist-link">
                Open Playlist
              </a>
              <button onClick={() => setPlaylistUrl(null)} className="create-another-button">
                Create Another
              </button>
            </div>
          ) : (
            <>
              <PlaylistForm onPlaylistDetailsChange={handlePlaylistDetailsChange} />
              <SongListInput onSongListChange={handleSongListChange} />
              <CreatePlaylistButton
                userId={userId}
                accessToken={accessToken}
                songList={songList}
                playlistName={playlistName}
                playlistDescription={playlistDescription}
                onPlaylistCreated={handlePlaylistCreated}
              />
            </>
          )
        ) : (
          <div className="login-prompt">
            <p>Please log in with Spotify to create playlists.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;