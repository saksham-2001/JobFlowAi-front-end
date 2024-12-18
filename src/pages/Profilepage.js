// ProfilePage
import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { API_BASE_URL } from "../constants";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function ProfilePage() {
    const [formData, setFormData] = useState({
        professionalSummary: "",
        education: [],
        experience: [],
        projects: [],
        certifications: [],
        skills: [],
        references: [],
        languages: [],
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};



    // Generic change handler for sections
    const handleChange = (e, section, index, field) => {
        const updatedSection = [...formData[section]];
        updatedSection[index][field] = e.target.value;
        setFormData({ ...formData, [section]: updatedSection });
    };

    const addEntry = (section, template) => {
        setFormData({ ...formData, [section]: [...formData[section], template] });
    };

    const removeEntry = (section, index) => {
        const updatedSection = [...formData[section]];
        updatedSection.splice(index, 1);
        setFormData({ ...formData, [section]: updatedSection });
    };
    
    useEffect(() => {
        axios.post(`${API_BASE_URL}/profile/fetch`, { email })
            .then(result => {
                if (result.data.success) {
                    console.log(result.data.profiledata);
                    setFormData(result.data.profiledata);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/profile/create`, { formData, email })
            .then(result => {
                if (result.data.success == true) {
                    alert("Profile Data Submitted Successfully");
                    console.log(result.data.profile);
                    navigate("/home");
                }
            })
            .catch(err => {
                alert("An error occured. Please try agin")
                console.log(err);
            })


    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            <form onSubmit={handleSubmit}>
                {/* Professional Summary */}
                <section>
                    <h2>Professional Summary</h2>
                    <textarea
                        rows="4"
                        placeholder="Write a brief professional summary..."
                        value={formData.professionalSummary}
                        onChange={(e) =>
                            setFormData({ ...formData, professionalSummary: e.target.value })
                        }
                    />
                </section>

                {/* Education */}
                {renderSection(
                    "Education",
                    formData.education,
                    {
                        institution: "",
                        degree: "",
                        fieldOfStudy: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    },
                    ["institution", "degree", "fieldOfStudy", "startDate", "endDate", "description"]
                )}

                {/* Work Experience */}
                {renderSection(
                    "Experience",
                    formData.experience,
                    {
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    },
                    ["company", "position", "startDate", "endDate", "description"]
                )}

                {/* Projects */}
                {renderSection(
                    "Projects",
                    formData.projects,
                    {
                        title: "",
                        description: "",
                        technologies: "",
                        link: "",
                    },
                    ["title", "description", "technologies", "link"]
                )}

                {/* Certifications */}
                {renderSection(
                    "Certifications",
                    formData.certifications,
                    {
                        title: "",
                        issuingOrganization: "",
                        issueDate: "",
                        expirationDate: "",
                    },
                    ["title", "issuingOrganization", "issueDate", "expirationDate"]
                )}

                {/* Skills */}
                {renderSection(
                    "Skills",
                    formData.skills,
                    { name: "", proficiency: "Intermediate" },
                    ["name", "proficiency"]
                )}

                {/* References */}
                {renderSection(
                    "References",
                    formData.references,
                    { name: "", relationship: "", email: "", phone: "" },
                    ["name", "relationship", "email", "phone"]
                )}

                {/* Languages */}
                {renderSection(
                    "Languages",
                    formData.languages,
                    { language: "", proficiency: "" },
                    ["language", "proficiency"]
                )}




                {/* Submit */}
                <button type="submit" className="submit-btn">
                    Save Profile
                </button>
            </form>
        </div>
    );

    // Reusable render function for dynamic sections
    function renderSection(title, sectionData, template, fields) {
        return (
            <section>
                <h2>{title}</h2>
                {sectionData.map((entry, index) => (
                    <div key={index} className="entry">
                        {fields.map((field) => (
                            <input
                                key={field}
                                type={field.includes("Date") ? "date" : "text"}
                                placeholder={capitalize(field.replace(/([A-Z])/g, " $1"))}
                                value={entry[field]}
                                onChange={(e) => handleChange(e, title.toLowerCase().replace(" ", ""), index, field)}
                            />
                        ))}
                        <button type="button" onClick={() => removeEntry(title.toLowerCase().replace(" ", ""), index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addEntry(title.toLowerCase().replace(" ", ""), template)}
                >
                    Add {title}
                </button>
            </section>
        );
    }

    // Capitalize function for placeholder formatting
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default ProfilePage;
