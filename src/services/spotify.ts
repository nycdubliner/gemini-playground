const CLIENT_ID = 'c96faaa717384fe5912acccdd9ad80ff';

const getRedirectUri = () => {
  const url = new URL(window.location.href);
  return `${url.origin}${url.pathname}`;
};

export const generateCodeVerifier = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const redirectToAuthCodeFlow = async () => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('response_type', 'code');
  params.append('redirect_uri', getRedirectUri());
  params.append('scope', 'user-read-private user-read-email playlist-modify-public playlist-modify-private');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (code: string): Promise<string> => {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', getRedirectUri());
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
};

export const fetchProfile = async (token: string) => {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(`Failed to get user profile: ${result.status} - ${error.error?.message || result.statusText}`);
  }

  return await result.json();
};

export const searchTrack = async (query: string, token: string) => {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(`Failed to search track: ${result.status} - ${error.error?.message || result.statusText}`);
  }

  const data = await result.json();
  return data.tracks.items[0];
};

export const createPlaylist = async (userId: string, name: string, description: string, token: string, uris: string[]) => {
  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create playlist: ${response.status} - ${error.error?.message || response.statusText}`);
  }

  const playlist = await response.json();

  if (uris && uris.length > 0) {
    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris }),
    });
  }

  return playlist;
};
