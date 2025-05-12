// app/(home)/page.js
import GetStarted from '@/components/GetStarted';
import { HomePageComponent } from '@/components/OpenPageComponents'; // Import your HomePageComponent
import Services from '@/components/Services';
import Trades from '@/components/Trades';

// This component will render for the root path '/' (within the (home) route group)
export default function HomePage() {
  return (
    <main className='flex w-full flex-col gap-12'>
      {/* Render the HomePageComponent for the root path */}
      <HomePageComponent />
      <div className="h-[2px] rounded-full bg-muted-foreground/50 w-[90%] md:w-[70%] mx-auto"></div>
      <Services/>
      <div className="h-[2px] rounded-full bg-muted-foreground/50 w-[90%] md:w-[70%] mx-auto"></div>
      <GetStarted/>
      <div className="h-[2px] rounded-full bg-muted-foreground/50 w-[90%] md:w-[70%] mx-auto"></div>
      <Trades/>
    </main>
  );
}

// Note: You do NOT need generateStaticParams in this file
// because it handles a fixed, non-dynamic route.
