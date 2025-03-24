import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSun, FiMoon, FiMenu, FiX, FiLink, FiCheck } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const PortfolioPage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(true);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const fetchData = () => {
      try {
        const data = JSON.parse(localStorage.getItem('portfolioData'));
        if (data) {
          setTimeout(() => {
            setPortfolioData(data);
            setIsLoading(false);
          }, 1000); // Simulate loading delay
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-50'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">No Portfolio Data Found</h2>
          <p className="mb-4">Please fill out the Data Entry Page first to create your portfolio.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
          >
            Go to Data Entry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const {
    studentName,
    bio,
    profilePicture,
    skills,
    interests,
    description,
    projects,
    socialMediaLinks,
  } = portfolioData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {studentName}'s Portfolio
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.a 
                href="#hero" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </motion.a>
              <motion.a 
                href="#about" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </motion.a>
              <motion.a 
                href="#projects" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </motion.a>
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-3 overflow-hidden"
              >
                <motion.a 
                  href="#hero" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </motion.a>
                <motion.a 
                  href="#about" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About
                </motion.a>
                <motion.a 
                  href="#projects" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Projects
                </motion.a>
                <motion.a 
                  href="#contact" 
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </motion.a>
                <motion.button
                  onClick={toggleDarkMode}
                  className="flex items-center py-2 text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? (
                    <>
                      <FiSun className="mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon className="mr-2" /> Dark Mode
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`relative py-20 md:py-32 overflow-hidden ${darkMode ? 'dark:bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {studentName}
            </h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {bio}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                View My Work
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            About Me
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/3 flex justify-center"
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur opacity-75 ${darkMode ? 'dark:opacity-50' : ''}`}></div>
                <img
                  src={profilePicture || "https://via.placeholder.com/300"}
                  alt="Profile"
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white dark:border-gray-800 z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-2/3 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.split(',').map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Interests</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{interests}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">About</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            My Projects
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <Draggable key={index} bounds="parent" defaultPosition={{ x: 0, y: 0 }} onStart={() => setDragActive(true)} onStop={() => setDragActive(false)}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`relative group cursor-move ${dragActive ? 'shadow-xl scale-105 z-10' : 'shadow-md'}`}
                >
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${darkMode ? 'dark:from-blue-600 dark:to-purple-700' : ''}`}></div>
                  <div className="h-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image || "https://via.placeholder.com/400x225"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub className="mr-2" />
                          View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Draggable>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          >
            Get In Touch
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Feel free to reach out to me through any of these channels:
              </p>
              
              <div className="space-y-4">
                {socialMediaLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name.toLowerCase().includes('github') ? (
                      <FaGithub size={20} />
                    ) : link.name.toLowerCase().includes('linkedin') ? (
                      <FaLinkedin size={20} />
                    ) : link.name.toLowerCase().includes('twitter') ? (
                      <FaTwitter size={20} />
                    ) : (
                      <FiLink size={20} />
                    )}
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
                >
                  Send Message
                </motion.button>
              </form>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 rounded-lg flex items-center gap-2"
                  >
                    <FiCheck size={18} className="text-green-600 dark:text-green-300" />
                    <span>Thank you! Your message has been sent.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {studentName}'s Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              {socialMediaLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name.toLowerCase().includes('github') ? (
                    <FaGithub size={20} />
                  ) : link.name.toLowerCase().includes('linkedin') ? (
                    <FaLinkedin size={20} />
                  ) : link.name.toLowerCase().includes('twitter') ? (
                    <FaTwitter size={20} />
                  ) : (
                    <FiLink size={20} />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;