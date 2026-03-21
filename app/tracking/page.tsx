import { Suspense } from 'react';
import TrackingClient from './TrackingClient';

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingClient />
    </Suspense>
  );
}