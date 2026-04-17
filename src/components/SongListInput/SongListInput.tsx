import React, { useState } from 'react';
import './SongListInput.css';

interface SongListInputProps {
  onSongListChange: (list: string) => void;
}

const SongListInput: React.FC<SongListInputProps> = ({ onSongListChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onSongListChange(e.target.value);
  };

  return (
    <textarea
      className="song-list-input"
      placeholder="Paste your song list here. One song per line..."
      value={value}
      onChange={handleChange}
    ></textarea>
  );
};

export default SongListInput;
