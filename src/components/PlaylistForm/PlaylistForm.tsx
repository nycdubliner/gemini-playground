import React from 'react';
import './PlaylistForm.css';

const PlaylistForm: React.FC = () => {
  return (
    <div className="playlist-form">
      <input type="text" placeholder="Playlist Name" className="input-field" />
      <textarea placeholder="Playlist Description" className="textarea-field"></textarea>
      <div className="public-private-toggle">
        <label>
          <input type="radio" name="privacy" value="private" defaultChecked />
          Private
        </label>
        <label>
          <input type="radio" name="privacy" value="public" />
          Public
        </label>
      </div>
    </div>
  );
};

export default PlaylistForm;
