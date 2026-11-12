import { lazy, Suspense } from 'react';
import { useRoute } from './router';
import World from './world/World';

// Blog and admin keep their earlier layout; they load (with their own styles) only when visited.
const Legacy = lazy(() => import('./legacy/Legacy'));

export default function App() {
  const path = useRoute();
  if (path === '/blog' || path.startsWith('/blog/') || path === '/admin') {
    return <Suspense fallback={null}><Legacy path={path} /></Suspense>;
  }
  return <World />;
}
