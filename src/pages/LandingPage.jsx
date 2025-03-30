import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-blue-500"
              >
                MedChain
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Revolutionizing Healthcare
              <span className="text-blue-500"> with Blockchain</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Secure, transparent, and efficient medical record management powered by blockchain technology.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center space-x-6 flex-wrap"
            >
              <Link
                to="/login?type=doctor"
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 mb-4 sm:mb-0"
              >
                Doctor Login
              </Link>
              <Link
                to="/login?type=patient"
                className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 mb-4 sm:mb-0"
              >
                Patient Login
              </Link>
              <Link
                to="/register"
                className="bg-medical-blue-600 hover:bg-medical-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Create Account
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16"
          >
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-blue-500 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-4">Secure Records</h3>
              <p className="text-gray-400">
                Your medical records are encrypted and secured using blockchain technology.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-blue-500 text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-4">Easy Access</h3>
              <p className="text-gray-400">
                Access your medical history anytime, anywhere with proper authentication.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-blue-500 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-4">Privacy Control</h3>
              <p className="text-gray-400">
                Full control over who can access your medical information.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}