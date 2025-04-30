
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using DecryptImage.com, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, you may not access or use our services.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700">
              DecryptImage.com provides text extraction services from images and PDF documents using AI technology. We offer both free and premium subscription plans with varying usage limits and features.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700">
              To use our services, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">4. Subscription and Payments</h2>
            <p className="text-gray-700">
              We offer free and premium subscription plans. Premium subscriptions are billed monthly and can be canceled at any time. No refunds will be provided for partial months of service.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">5. User Data and Privacy</h2>
            <p className="text-gray-700">
              We respect your privacy and are committed to protecting your personal data. Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and disclose information about you.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on DecryptImage.com, including text, graphics, logos, and software, is the property of DecryptImage.com and is protected by intellectual property laws.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">7. User Content</h2>
            <p className="text-gray-700">
              You retain ownership of any content you upload to our service. By uploading content, you grant us a non-exclusive license to process and store your content solely for the purpose of providing our services.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">8. Prohibited Uses</h2>
            <p className="text-gray-700">
              You may not use our service for any illegal purpose or to transmit any material that is offensive, harmful, or violates the rights of others.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your account at any time for violations of these Terms or for any other reason at our sole discretion.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-700">
              DecryptImage.com is provided "as is" without warranties of any kind. We shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of the service.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We may modify these Terms at any time. Your continued use of the service after such modifications constitutes your acceptance of the revised Terms.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">12. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by the laws of the United States without regard to its conflict of law principles.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">13. Contact</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at support@decryptimage.com.
            </p>
          </section>
          
          <div className="text-gray-500 text-sm mt-8">
            Last updated: April 30, 2025
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
