import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-900 mb-6">Page Not Found</h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;