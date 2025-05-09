
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">
              At DecryptImage.com, we collect information you provide directly to us, such as when you create an account, upload content, or contact us. This may include your name, email address, and the content of files you upload for text extraction.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use the information we collect to provide, maintain, and improve our services, process your requests, and communicate with you about your account and our services.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information. Files you upload for text extraction are processed securely and are not shared with third parties. The text extracted from your files is only displayed to you.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
            <p className="text-gray-700">
              We retain your account information for as long as your account is active. Uploaded files and extracted text are temporarily stored for processing and are automatically deleted after 30 days.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, correct, or delete your personal information. You can also request that we restrict processing of your personal data or object to our processing of your data.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
            <p className="text-gray-700">
              Our service may contain links to third-party websites or services that are not owned or controlled by DecryptImage.com. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at privacy@decryptimage.com.
            </p>
          </section>
          
          <div className="text-gray-500 text-sm mt-8">
            Last updated: May 9, 2025
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
