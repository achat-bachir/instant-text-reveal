
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 mt-auto border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} DecryptImage.com. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
            Contact
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-brand-primary transition-colors flex items-center">
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
