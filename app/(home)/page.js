// app/(home)/page.js
import { HomePageComponent } from '@/components/OpenPageComponents'; // Import your HomePageComponent

// This component will render for the root path '/' (within the (home) route group)
export default function HomePage() {
  return (
    <main>
      {/* Render the HomePageComponent for the root path */}
      <HomePageComponent />
    </main>
  );
}

// Note: You do NOT need generateStaticParams in this file
// because it handles a fixed, non-dynamic route.
