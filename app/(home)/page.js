// app/(home)/page.js
import { HomePageComponent } from '@/components/OpenPageComponents'; // Import your HomePageComponent
import Services from '@/components/Services';

// This component will render for the root path '/' (within the (home) route group)
export default function HomePage() {
  return (
    <main>
      {/* Render the HomePageComponent for the root path */}
      <HomePageComponent />
      <Services/>
    </main>
  );
}

// Note: You do NOT need generateStaticParams in this file
// because it handles a fixed, non-dynamic route.
