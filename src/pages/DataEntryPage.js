import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiBook,
  FiImage,
  FiCode,
  FiHeart,
  FiFileText,
  FiGithub,
  FiLink,
  FiPlus,
  FiCheck,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const DataEntryPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  // Details of the student
  const [formData, setFormData] = useState({
    studentName: "",
    bio: "",
    profilePicture: "",
    skills: "",
    interests: "",
    description: "",
  });

  // Projects state
  const [projects, setProjects] = useState([
    { title: "", description: "", image: "", githubLink: "" },
  ]);

  // Social media links state
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { name: "", url: "" },
  ]);

  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation of the form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const data = {
      ...formData,
      projects,
      socialMediaLinks,
    };

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("portfolioData", JSON.stringify(data));
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.studentName.trim()) errors.studentName = "Name is required";
    if (!formData.bio.trim()) errors.bio = "Bio is required";
    return errors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a new project field
  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", image: "", githubLink: "" },
    ]);
  };

  // Add a new social media link field
  const addSocialMediaLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { name: "", url: "" }]);
  };

  // project input changin
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  // Handling social media input change
  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index][field] = value;
    setSocialMediaLinks(updatedLinks);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: darkMode
          ? "url('https://images6.alphacoders.com/894/894090.jpg')"
          : "url('https://mrwallpaper.com/images/hd/daytime-tokyo-japan-4k-n2qo7awpt071c0m8.jpg')",
      }}
    >
      {/*<div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}></div>*/}
      <div className="container mx-auto px-4 py-8">
        {/* Magic of dark mode */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Main card */}
        <div
          className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
            darkMode
              ? "dark:bg-gray-800 dark:text-white bg-opacity-90 backdrop-blur-sm"
              : "bg-white"
          }`}
        >
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white">
              Student Portfolio Creator
            </h1>
            <p className="text-blue-100 mt-1">
              Fill in your details to create a portfolio website on the go!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Student Details Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-2">
                Personal Information
              </h2>

              {/* Floating label input example */}
              <div className="relative">
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg peer ${
                    darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                  } ${
                    formErrors.studentName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder=" "
                  required
                />
                <label
                  className={`absolute left-3 top-3 px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-blue-600 peer-focus:text-sm ${
                    formData.studentName ? "-top-2 text-sm" : ""
                  } ${
                    darkMode
                      ? "dark:text-gray-300 dark:peer-focus:text-blue-400"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiUser size={16} />
                    <span>Student Name</span>
                  </div>
                </label>
                {formErrors.studentName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.studentName}
                  </p>
                )}
              </div>

              {/* Bio with icon */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <FiBook size={16} />
                  <span>Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                  } ${
                    formErrors.bio
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  rows={3}
                  required
                />
                {formErrors.bio && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>
                )}
              </div>

              {/* Grid layout for smaller fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <FiImage size={16} />
                    <span>Profile Picture URL</span>
                  </label>
                  <input
                    type="text"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${
                      darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                    }`}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <FiCode size={16} />
                    <span>Skills (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${
                      darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                    }`}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <FiHeart size={16} />
                    <span>Interests</span>
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${
                      darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <FiFileText size={16} />
                  <span>Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? "dark:bg-gray-700 dark:border-gray-600" : ""
                  }`}
                  rows={3}
                />
              </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-2xl font-semibold">Projects</h2>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                >
                  <FiPlus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? "dark:bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3 className="text-lg font-medium mb-3">
                    Project {index + 1}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(index, "title", e.target.value)
                        }
                        className={`w-full p-2 border rounded-lg ${
                          darkMode
                            ? "dark:bg-gray-600 dark:border-gray-500"
                            : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className={`w-full p-2 border rounded-lg ${
                          darkMode
                            ? "dark:bg-gray-600 dark:border-gray-500"
                            : ""
                        }`}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1">
                          <FiImage size={14} />
                          <span>Image URL</span>
                        </label>
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) =>
                            handleProjectChange(index, "image", e.target.value)
                          }
                          className={`w-full p-2 border rounded-lg ${
                            darkMode
                              ? "dark:bg-gray-600 dark:border-gray-500"
                              : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1">
                          <FiGithub size={14} />
                          <span>GitHub Link</span>
                        </label>
                        <input
                          type="text"
                          value={project.githubLink}
                          onChange={(e) =>
                            handleProjectChange(
                              index,
                              "githubLink",
                              e.target.value
                            )
                          }
                          className={`w-full p-2 border rounded-lg ${
                            darkMode
                              ? "dark:bg-gray-600 dark:border-gray-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Social Media Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-2xl font-semibold">Social Media Links</h2>
                <button
                  type="button"
                  onClick={addSocialMediaLink}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                >
                  <FiPlus size={16} />
                  <span>Add Link</span>
                </button>
              </div>

              {socialMediaLinks.map((link, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? "dark:bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h3 className="text-lg font-medium mb-3">Link {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <FiLink size={14} />
                        <span>Platform Name</span>
                      </label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) =>
                          handleSocialMediaChange(index, "name", e.target.value)
                        }
                        className={`w-full p-2 border rounded-lg ${
                          darkMode
                            ? "dark:bg-gray-600 dark:border-gray-500"
                            : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <FiLink size={14} />
                        <span>URL</span>
                      </label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          handleSocialMediaChange(index, "url", e.target.value)
                        }
                        className={`w-full p-2 border rounded-lg ${
                          darkMode
                            ? "dark:bg-gray-600 dark:border-gray-500"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Submit Section */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FiCheck size={18} />
                    <span>Save Portfolio</span>
                  </div>
                )}
              </button>

              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <FiCheck size={18} className="text-green-600" />
                  <span>Data saved successfully!</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataEntryPage;
