import React, { useState, useEffect } from 'react';
import './PlaylistForm.css';

interface PlaylistFormProps {
  onPlaylistDetailsChange: (details: { name: string; description: string }) => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ onPlaylistDetailsChange }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    onPlaylistDetailsChange({ name, description });
  }, [name, description, onPlaylistDetailsChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="playlist-form">
      <input
        type="text"
        placeholder="Playlist Name"
        className="input-field"
        value={name}
        onChange={handleNameChange}
      />
      <textarea
        placeholder="Playlist Description"
        className="textarea-field"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
    </div>
  );
};

export default PlaylistForm;
