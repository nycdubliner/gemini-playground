import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import SongListInput from './components/SongListInput/SongListInput';
import CreatePlaylistButton from './components/CreatePlaylistButton/CreatePlaylistButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create a Spotify Playlist</h1>
        <p>Paste a list of songs and we'll make a playlist for you.</p>
      </header>
      <main className="App-main">
        <PlaylistForm />
        <SongListInput />
        <CreatePlaylistButton />
      </main>
    </div>
  );
}

export default App;