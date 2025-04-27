import { useState } from 'react';
import axios from 'axios';
export default function UserProfileForm() {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      about: ''
    },
    skills: '',
    career: [
      { company: '', position: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { institution: '', degree: '', field: '', graduationYear: '', description: '' }
    ]
  });
  const [showSummary, setShowSummary] = useState(false);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value
      }
    });
  };

  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value
    });
  };

  const handleCareerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCareer = [...formData.career];
    updatedCareer[index] = {
      ...updatedCareer[index],
      [name]: value
    };
    setFormData({
      ...formData,
      career: updatedCareer
    });
  };

  const addCareerEntry = () => {
    setFormData({
      ...formData,
      career: [
        ...formData.career,
        { company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();  // important to prevent page reload
    await generateSummary();  // call your function here
    setShowSummary(true);  // move to showing the summary
  };
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value
    };
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  const addEducationEntry = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: '', degree: '', field: '', graduationYear: '', description: '' }
      ]
    });
  };

  const generateSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/getSummary', formData);
      console.log(response);
      setSummary(response.data.message);  // Save the summary
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!showSummary ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">About Yourself</label>
                <textarea
                  name="about"
                  value={formData.personalInfo.about}
                  onChange={handlePersonalInfoChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief introduction about yourself..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div>
              <label className="block text-gray-700 mb-1">Your Skills</label>
              <textarea
                value={formData.skills}
                onChange={handleSkillsChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your skills separated by commas (e.g., JavaScript, React, UI Design)"
              ></textarea>
            </div>
          </div>

          {/* Career History Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Career History</h2>
            {formData.career.map((job, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Position {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={job.company}
                      onChange={(e) => handleCareerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={job.position}
                      onChange={(e) => handleCareerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      name="startDate"
                      value={job.startDate}
                      onChange={(e) => handleCareerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">End Date</label>
                    <input
                      type="text"
                      name="endDate"
                      value={job.endDate}
                      onChange={(e) => handleCareerChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YYYY or 'Present'"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={job.description}
                      onChange={(e) => handleCareerChange(index, e)}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your responsibilities and achievements..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addCareerEntry}
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              + Add Another Position
            </button>
          </div>

          {/* Education Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Education {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Institution</label>
                    <input
                      type="text"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Bachelor's, Master's, Ph.D."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Field of Study</label>
                    <input
                      type="text"
                      name="field"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      name="graduationYear"
                      value={edu.graduationYear}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={edu.description}
                      onChange={(e) => handleEducationChange(index, e)}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Notable achievements, research, activities..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addEducationEntry}
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              + Add Another Education
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Generate Summary
            </button>
          </div>
        </form>
      ): (
        loading ? (
          <div className="text-center mt-10">
            <p className="text-gray-700">Generating your summary...</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p className="text-gray-700">
              {summary}
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowSummary(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Form
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}