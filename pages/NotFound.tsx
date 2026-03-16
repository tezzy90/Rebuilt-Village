import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta(
    'Page Not Found — Rebuilt Village',
    'The page you are looking for does not exist. Return to the Rebuilt Village homepage.'
  );
  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h2 className="mt-6 text-4xl font-extrabold text-[#f4f0eb] tracking-tight sm:text-5xl">
            404
          </h2>
          <p className="mt-2 text-lg text-[#b8b0a1]">
            Page not found
          </p>
        </div>
        <p className="text-sm text-[#b8b0a1] max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-stone-900 bg-[#8bb8a8] hover:bg-[#7aa797] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8bb8a8]"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
