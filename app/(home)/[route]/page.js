import { ContactPageComponent, AboutPageComponent, ServicesPageComponent, LegalPageComponent } from '@/components/OpenPageComponents';

const ErrorPageComponent = () => <div>Error: Route not found!</div>; // Component for unmatched routes

// --- Route Definitions ---
// Define your routes and associate them with components.
// Note: The 'href' here should match the full path you want to map.
// The 'component' property holds the React component to render.
const homeRoutes = [
    {
        name: 'About',
        href: '/about',
        component: AboutPageComponent // Component for /about
    },
    {
        name: 'Contact',
        href: '/contact',
        component: ContactPageComponent // Component for /contact
    },
    {
        name: 'Services',
        href: '/services',
        component: ServicesPageComponent // Component for /services
    },
    {
        name: 'Legal',
        href: '/legal',
        component: LegalPageComponent // Component for /legal
    }
    // Add more routes here as needed
];

export async function generateStaticParams() {
    return homeRoutes
        .map((individualRoute) => {
            
            const segment = individualRoute.href
            return {
                route: segment
            };
        });
}

export default async function DynamicHomePage({ params }) {
    // Get the captured segment from the URL (e.g., 'about', 'contact').
    const routeInformation = await params
    // Reconstruct the full path based on the captured segment.
    // We add the leading slash back to match the 'href' in homeRoutes.
    const fullPath = `/${routeInformation.route}`;

    // Find the route object in homeRoutes that matches the reconstructed full path.
    const matchedRoute = homeRoutes.find(route => route.href === fullPath);

    // Check if a matching route was found AND if it has a component defined.
    if (matchedRoute && matchedRoute.component) {
        // If found, render the associated component.
        const ComponentToRender = matchedRoute.component;
        return (
            <main>
                {/* You can optionally pass props to the component if needed */}
                <ComponentToRender />
            </main>
        );
    } else {
        return (
            <main>
                <ErrorPageComponent />
            </main>
        );
    }
}
