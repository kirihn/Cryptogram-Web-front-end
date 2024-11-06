// src/pages/ErrorPage.tsx
import { useLocation } from 'react-router-dom';

export function ErrorPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const message = query.get('message') || 'Произошла ошибка';

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Ошибка</h1>
      <p>{message}</p>
    </div>
  );
}
