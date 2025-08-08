import React from 'react'

function Footer() {
    return (
        <footer className="relative z-10 bg-black border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">architect.io</h3>
                        <p className="text-gray-400 mb-4">
                            Transforming system design education with interactive learning experiences.
                        </p>
                        <div className="flex gap-4">
                            {['📱', '💻', '🎮'].map((icon, index) => (
                                <div key={index} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                    <span className="text-lg">{icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {[
                        {
                            title: "Platform",
                            links: ["Features", "Testimonials", "FAQ"]
                        },
                        {
                            title: "Learning",
                            links: ["System Design", "Courses", "Certifications", "Resources"]
                        },
                        {
                            title: "Support",
                            links: ["Help Center", "Community", "Contact", "Updates"]
                        }
                    ].map((section, index) => (
                        <div key={index}>
                            <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 architect.io. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer