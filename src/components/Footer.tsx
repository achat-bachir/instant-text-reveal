
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 mt-auto border-t bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DecryptImage</h3>
            <p className="text-sm text-gray-600 mb-4">
              Extract text from images and PDFs instantly using advanced AI technology.
              Our tool helps you convert any visual text to editable format.
            </p>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} DecryptImage.com. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Login / Register
                </Link>
              </li>
              <li>
                <a href="#file-uploader" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Extract Text
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@decryptimage.com" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://github.com/decryptimage" className="text-sm text-gray-600 hover:text-brand-primary transition-colors flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
