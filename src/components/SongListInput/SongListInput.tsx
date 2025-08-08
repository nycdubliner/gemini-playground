import React from 'react';
import './SongListInput.css';

const SongListInput: React.FC = () => {
  return (
    <textarea
      className="song-list-input"
      placeholder="Paste your song list here. One song per line..."
    ></textarea>
  );
};

export default SongListInput;
