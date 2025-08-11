import { useEffect } from 'react';
import { api } from '../lib/api';

export default function ApiTest() {
  useEffect(() => {
    api.get('/ping')
      .then(res => console.log('API /ping:', res.data))
      .catch(err => console.error('API /ping error:', err));
  }, []);

  return null; // nothing visible; check the browser console
}
