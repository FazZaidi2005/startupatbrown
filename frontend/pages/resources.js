import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { surveyQuestions } from "../data/surveyQuestions";
import { resourceTrees } from "../data/resourceTrees";
import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const Resources = () => {
    const trees = { surveyQuestions: surveyQuestions, resources: resourceTrees }
    const router = useRouter()
    const sorted = Object.values(trees.resources).sort((a, b) => (a.title > b.title) ? 1 : -1)

    const { display } = router.query
    const disValues = display && JSON.parse(display)
    const values = Array.isArray(disValues) ?
        disValues.map(item => sorted.find(element => element.id === item)) : sorted

    // State for managing dropdowns
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubcategory, setOpenSubcategory] = useState(null);

    // Resource categories data structure
    const resourceCategories = {
        professional: {
            title: "Professional",
            subcategories: {
                networking: {
                    name: "Networking",
                    resources: [
                        {
                            id: "p1",
                            name: "Brown Alumni Network",
                            url: "#",
                            description: "Connect with Brown alumni in various industries"
                        },
                        {
                            id: "p2",
                            name: "LinkedIn Groups",
                            url: "#",
                            description: "Professional networking groups for Brown entrepreneurs"
                        }
                    ]
                },
                mentorship: {
                    name: "Mentorship",
                    resources: [
                        {
                            id: "p3",
                            name: "Mentor Match Program",
                            url: "#",
                            description: "Find a mentor in your field of interest"
                        },
                        {
                            id: "p4",
                            name: "Industry Advisors",
                            url: "#",
                            description: "Connect with industry professionals for guidance"
                        }
                    ]
                },
                careerDevelopment: {
                    name: "Career Development",
                    resources: [
                        {
                            id: "p5",
                            name: "Resume Workshop",
                            url: "#",
                            description: "Resources for crafting the perfect resume"
                        },
                        {
                            id: "p6",
                            name: "Interview Prep",
                            url: "#",
                            description: "Practice interviews and preparation materials"
                        }
                    ]
                }
            }
        },
        students: {
            title: "Students",
            subcategories: {
                academics: {
                    name: "Academics",
                    resources: [
                        {
                            id: "s1",
                            name: "Course Planning",
                            url: "#",
                            description: "Guide to entrepreneurship courses at Brown"
                        },
                        {
                            id: "s2",
                            name: "Study Groups",
                            url: "#",
                            description: "Join entrepreneurship study groups"
                        }
                    ]
                },
                organizations: {
                    name: "Student Organizations",
                    resources: [
                        {
                            id: "s3",
                            name: "Entrepreneurship Club",
                            url: "#",
                            description: "Join Brown's premier entrepreneurship organization"
                        },
                        {
                            id: "s4",
                            name: "Innovation Lab",
                            url: "#",
                            description: "Work on innovative projects with other students"
                        }
                    ]
                },
                events: {
                    name: "Campus Events",
                    resources: [
                        {
                            id: "s5",
                            name: "Startup Weekend",
                            url: "#",
                            description: "54-hour startup creation event"
                        },
                        {
                            id: "s6",
                            name: "Pitch Competitions",
                            url: "#",
                            description: "Present your ideas and win funding"
                        }
                    ]
                }
            }
        },
        opportunities: {
            title: "Opportunities",
            subcategories: {
                internships: {
                    name: "Internships",
                    resources: [
                        {
                            id: "o1",
                            name: "Summer Internships",
                            url: "#",
                            description: "Find startup internships for the summer"
                        },
                        {
                            id: "o2",
                            name: "Remote Opportunities",
                            url: "#",
                            description: "Remote internship positions"
                        }
                    ]
                },
                jobs: {
                    name: "Full-time Jobs",
                    resources: [
                        {
                            id: "o3",
                            name: "Job Board",
                            url: "#",
                            description: "Current job openings in startups"
                        },
                        {
                            id: "o4",
                            name: "Recent Grad Positions",
                            url: "#",
                            description: "Entry-level positions for new graduates"
                        }
                    ]
                },
                research: {
                    name: "Research",
                    resources: [
                        {
                            id: "o5",
                            name: "Research Projects",
                            url: "#",
                            description: "Join ongoing research in entrepreneurship"
                        },
                        {
                            id: "o6",
                            name: "Labs & Centers",
                            url: "#",
                            description: "Research centers focused on innovation"
                        }
                    ]
                }
            }
        }
    };

    // Toggle functions for dropdowns
    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
        setOpenSubcategory(null); // Close any open subcategory
    };

    const toggleSubcategory = (subcategory) => {
        setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
    };

    const linkPillStyle = `py-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600
    focus:bg-red-50 focus:border-red-300 focus:text-red-600
    transition-all duration-200
    px-2 text-sm text-gray-700 md:text-base border border-gray-200 shadow-sm rounded-full inline-block mb-2 mr-2`

    return <>
        <Head>
            <title>Resources | Venture@Brown</title>
        </Head>
        <div className="max-w-3xl mx-auto px-4 my-24">
            <Navbar />
            <Link href="/suggest">
                <a className="red-link uppercase text-lg">Suggest a resource</a>
            </Link>

            <h1 className="text-5xl font-bold text-gray-900 font-display">Resources</h1>

            {/* Categories with Nested Dropdowns */}
            <section className="my-6">
                <h2 className="font-display text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
               
                <div className="space-y-4">
                    {Object.entries(resourceCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="border rounded-lg shadow-sm bg-white">
                            {/* Main Category Button */}
                            <button
                                onClick={() => toggleCategory(categoryKey)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-red-50 rounded-t-lg transition-colors duration-200"
                            >
                                <span className="font-medium text-gray-800">{category.title}</span>
                                {openCategory === categoryKey ?
                                    <ChevronUp className="h-5 w-5 text-gray-500" /> :
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                }
                            </button>
                           
                            {/* Subcategories */}
                            {openCategory === categoryKey && (
                                <div className="border-t">
                                    {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                                        <div key={subKey} className="border-b last:border-b-0">
                                            {/* Subcategory Button */}
                                            <button
                                                onClick={() => toggleSubcategory(subKey)}
                                                className="w-full px-6 py-2 flex items-center justify-between hover:bg-red-50 transition-colors duration-200 text-left"
                                            >
                                                <span className="text-sm text-gray-700">{subcategory.name}</span>
                                                {openSubcategory === subKey ?
                                                    <ChevronUp className="h-4 w-4 text-gray-400" /> :
                                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                                }
                                            </button>
                                           
                                            {/* Resources List */}
                                            {openSubcategory === subKey && (
                                                <div className="bg-gray-50 px-6 py-3">
                                                    {subcategory.resources.map((resource) => (
                                                        <a
                                                            key={resource.id}
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block py-2 group"
                                                        >
                                                            <div className="flex items-start">
                                                                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-red-500 mt-1 mr-2 flex-shrink-0" />
                                                                <div>
                                                                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                                                                        {resource.name}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 group-hover:text-red-500">
                                                                        {resource.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Original Resource Links */}
                {values.map(resTree => (
                    <a
                        key={resTree.id}
                        className={linkPillStyle}
                        href={`#${resTree.id}`}
                    >
                        {resTree.title}
                    </a>
                ))}
               
                {Array.isArray(disValues) && (
                    <Link href="/resources">
                        <a className={linkPillStyle}>See more resources</a>
                    </Link>
                )}
            </section>

            {/* Resource Sections */}
            {values.map(resourceTree => (
                <section key={resourceTree.id} id={resourceTree.id} className="mt-8">
                    <h2 className="font-display text-2xl font-semibold text-gray-800">
                        {resourceTree.title}
                    </h2>
                    <ul className="divide-y divide-gray-300 mt-2">
                        {resourceTree.resources.map(resource => (
                            <li key={resource.id} className="py-3">
                                <a className="group" href={resource.url} target="_blank">
                                    <h2 className="text-base font-medium text-gray-800 group-hover:text-red-600 group-focus:text-red-600">
                                        {resource.name}
                                    </h2>
                                    <p className="text-gray-500 group-hover:text-red-600 group-focus:text-red-600 text-sm">
                                        {resource.description}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    </>
}

export default Resources