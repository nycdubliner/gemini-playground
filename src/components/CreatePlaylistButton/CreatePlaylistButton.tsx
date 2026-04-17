import React, { useState } from 'react';
import { createPlaylist, searchTrack } from '../../services/spotify';
import './CreatePlaylistButton.css';

interface CreatePlaylistButtonProps {
  userId: string | null;
  accessToken: string | null;
  songList: string;
  playlistName: string;
  playlistDescription: string;
  onPlaylistCreated: (url: string) => void;
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({
  userId,
  accessToken,
  songList,
  playlistName,
  playlistDescription,
  onPlaylistCreated,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState('');

  const parseSongs = (text: string) => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
    return lines.map((line) => {
      const parts = line.split(' - ').map((part) => part.trim());
      if (parts.length >= 2) {
        return { title: parts[0], artist: parts[1] };
      }
      return { title: parts[0] };
    });
  };

  const handleCreatePlaylist = async () => {
    if (!userId || !accessToken) {
      console.error('User ID or Access Token is missing.');
      return;
    }

    setIsCreating(true);
    setStatus('Parsing song list...');

    const songs = parseSongs(songList);
    console.log('Parsed Songs:', songs);

    const uris: string[] = [];
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const query = song.artist ? `${song.title} ${song.artist}` : song.title;
      setStatus(`Searching for track ${i + 1} of ${songs.length}: ${query}`);

      try {
        const track = await searchTrack(query, accessToken);
        if (track) {
          uris.push(track.uri);
          console.log(`Found track: ${track.name} by ${track.artists[0].name}`);
        } else {
          console.warn(`No track found for: ${query}`);
        }
      } catch (error) {
        console.error(`Error searching for ${query}:`, error);
      }
    }

    if (!playlistName.trim()) {
      alert('Please enter a playlist name.');
      setIsCreating(false);
      setStatus('');
      return;
    }

    setStatus('Creating playlist on Spotify...');
    try {
      const playlist = await createPlaylist(userId, playlistName, playlistDescription, accessToken, uris);
      console.log('Playlist created:', playlist);
      onPlaylistCreated(playlist.external_urls.spotify);
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert(`Failed to create playlist: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsCreating(false);
      setStatus('');
    }
  };

  return (
    <button
      className="create-playlist-button"
      onClick={handleCreatePlaylist}
      disabled={isCreating || !userId || !accessToken}
    >
      {isCreating ? status || 'Creating Playlist...' : 'Create Playlist'}
    </button>
  );
};

export default CreatePlaylistButton;
