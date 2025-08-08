"use client";

import React, { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, ArrowRight, BookOpen, Code, Target, Trophy, Medal, ChevronDown, ChevronRight, PlayCircle, Users, Database, Globe, Zap, Shield, TrendingUp, Lightbulb, Star, ArrowLeft } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function SystemDesignLesson() {
    const [completedSections, setCompletedSections] = useState(new Set());
    const [activeTab, setActiveTab] = useState('overview');
    const [showVideo, setShowVideo] = useState(false);
    const [animatedBoxes, setAnimatedBoxes] = useState({});

    useEffect(() => {
        // Animate boxes on scroll
        const handleScroll = () => {
            const boxes = document.querySelectorAll('[data-animate]');
            boxes.forEach((box, index) => {
                const rect = box.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible && !animatedBoxes[index]) {
                    setAnimatedBoxes(prev => ({ ...prev, [index]: true }));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animatedBoxes]);

    const toggleSection = (sectionId) => {
        const newCompleted = new Set(completedSections);
        if (newCompleted.has(sectionId)) {
            newCompleted.delete(sectionId);
        } else {
            newCompleted.add(sectionId);
        }
        setCompletedSections(newCompleted);
    };

    const navItems = [
        { name: 'Home', href: '#' },
        { name: 'Curriculum', href: '#', active: false },
        { name: 'Practice', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Resources', href: '#' }
    ];

    const keyTopics = [
        { icon: Users, title: "Scalability", description: "Design systems that grow with demand" },
        { icon: Database, title: "Reliability", description: "Build fault-tolerant architectures" },
        { icon: Globe, title: "Availability", description: "Ensure 99.9% uptime and beyond" },
        { icon: Zap, title: "Performance", description: "Optimize for speed and efficiency" },
        { icon: Shield, title: "Security", description: "Protect data and prevent attacks" },
        { icon: TrendingUp, title: "Consistency", description: "Maintain data integrity across systems" }
    ];

    const realWorldExamples = [
        {
            company: "Netflix",
            challenge: "Streaming to 230M+ users globally",
            solution: "Microservices, CDN, and personalization algorithms",
            impact: "99.97% uptime, 15+ billion hours watched monthly"
        },
        {
            company: "WhatsApp",
            challenge: "Handling 100B+ messages daily",
            solution: "Erlang-based architecture, message queuing",
            impact: "2B users with minimal server infrastructure"
        },
        {
            company: "Uber",
            challenge: "Real-time matching of drivers and riders",
            solution: "Geospatial databases, event-driven architecture",
            impact: "18M trips daily across 70+ countries"
        }
    ];

    const tabs = [
        { id: 'overview', name: 'Overview', icon: BookOpen },
        { id: 'components', name: 'Components', icon: Code },
        { id: 'examples', name: 'Examples', icon: Target },
        { id: 'career', name: 'Career Impact', icon: Trophy }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full filter blur-2xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10">
                {/* Navigation */}
                <Navbar/>

                {/* Hero Section */}
                <div className="px-8 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-medium">Lesson 1</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">30 min read</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                What is <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">System Design</span>?
                            </h1>

                            <p className="text-xl text-gray-300 max-w-3xl mb-8">
                                System design is the process of defining the architecture, components, and interfaces of a system to satisfy specified requirements. Learn the fundamentals that power the world's largest applications.
                            </p>

                            {/* Progress Bar */}
                            <div className="bg-gray-800 rounded-full h-2 mb-8">
                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${(completedSections.size / 6) * 100}%` }}></div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
                                >
                                    <PlayCircle className="w-5 h-5" />
                                    <span>Watch Introduction Video</span>
                                </button>
                                <button className="flex items-center space-x-3 px-6 py-3 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-colors">
                                    <BookOpen className="w-5 h-5" />
                                    <span>Download Notes</span>
                                </button>
                            </div>
                        </div>

                        {/* Video Modal */}
                        {showVideo && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowVideo(false)}>
                                <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-white">Introduction to System Design</h3>
                                        <button onClick={() => setShowVideo(false)} className="text-gray-400 hover:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <PlayCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                                            <p className="text-gray-400">Video: System Design Fundamentals</p>
                                            <p className="text-sm text-gray-500 mt-2">Duration: 15 minutes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex space-x-1 bg-white/5 rounded-2xl p-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="px-8 py-12">
                    <div className="max-w-6xl mx-auto">

                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                {/* Definition Section */}
                                <div
                                    data-animate
                                    className={`transform transition-all duration-1000 ${animatedBoxes[0] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                >
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                                <Lightbulb className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-white">Core Definition</h2>
                                        </div>
                                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                            System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It involves making high-level design choices about how different parts of a system will work together to achieve business goals while handling constraints like scalability, reliability, and performance.
                                        </p>
                                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                                            <p className="text-blue-300 font-medium">
                                                Key Insight: System design is not just about technology - it's about understanding business requirements and making informed trade-offs between competing concerns.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Why System Design Matters */}
                                <div
                                    data-animate
                                    className={`transform transition-all duration-1000 delay-200 ${animatedBoxes[1] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                >
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                        <h2 className="text-3xl font-bold text-white mb-8">Why System Design Matters</h2>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xl font-semibold text-blue-400 mb-4">For Businesses</h3>
                                                <ul className="space-y-3 text-gray-300">
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                                        <span>Reduces development costs by 60-80%</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                                        <span>Enables rapid scaling from thousands to millions of users</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                                        <span>Minimizes downtime and system failures</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold text-cyan-400 mb-4">For Engineers</h3>
                                                <ul className="space-y-3 text-gray-300">
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                                        <span>Essential skill for senior engineering roles</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                                        <span>Average salary increase of $40K-80K</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                                                        <span>Required for FAANG and top tech interviews</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Topics Grid */}
                                <div
                                    data-animate
                                    className={`transform transition-all duration-1000 delay-400 ${animatedBoxes[2] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                >
                                    <h2 className="text-3xl font-bold text-white mb-8">Key System Design Principles</h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {keyTopics.map((topic, index) => {
                                            const Icon = topic.icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer transform hover:scale-105"
                                                    onClick={() => toggleSection(`topic-${index}`)}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <Icon className="w-8 h-8 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                                                        {completedSections.has(`topic-${index}`) ? (
                                                            <CheckCircle className="w-6 h-6 text-green-400" />
                                                        ) : (
                                                            <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                                                    <p className="text-gray-400">{topic.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'components' && (
                            <div className="space-y-12">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-3xl font-bold text-white mb-8">System Components Breakdown</h2>

                                    {/* Interactive Component Diagram */}
                                    <div className="bg-gray-900/50 rounded-xl p-8 mb-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                            <div className="space-y-4">
                                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mx-auto flex items-center justify-center">
                                                    <Users className="w-10 h-10 text-white" />
                                                </div>
                                                <h3 className="text-lg font-bold text-white">Client Layer</h3>
                                                <p className="text-gray-400 text-sm">Web browsers, mobile apps, APIs</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center">
                                                    <Globe className="w-10 h-10 text-white" />
                                                </div>
                                                <h3 className="text-lg font-bold text-white">Application Layer</h3>
                                                <p className="text-gray-400 text-sm">Load balancers, web servers, business logic</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                                                    <Database className="w-10 h-10 text-white" />
                                                </div>
                                                <h3 className="text-lg font-bold text-white">Data Layer</h3>
                                                <p className="text-gray-400 text-sm">Databases, caching, file storage</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-300 text-lg mb-6">
                                            Every large-scale system consists of multiple interconnected components. Understanding how these components work together is crucial for designing robust and scalable architectures.
                                        </p>

                                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20 mb-6">
                                            <p className="text-yellow-300 font-medium">
                                                Architecture Tip: Always start with the simplest architecture that meets your requirements, then add complexity only when necessary.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'examples' && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-white mb-8">Real-World Examples</h2>

                                {realWorldExamples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/8 transition-all"
                                    >
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                                {example.company[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{example.company}</h3>
                                                <p className="text-gray-400">{example.challenge}</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-lg font-semibold text-blue-400 mb-3">Solution Approach</h4>
                                                <p className="text-gray-300">{example.solution}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-green-400 mb-3">Business Impact</h4>
                                                <p className="text-gray-300">{example.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'career' && (
                            <div className="space-y-8">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-3xl font-bold text-white mb-8">Career Impact of System Design Skills</h2>

                                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-blue-400">Salary Impact</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                                                    <span className="text-gray-300">Junior Developer</span>
                                                    <span className="text-white font-bold">$80K - $120K</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                                    <span className="text-gray-300">Senior with System Design</span>
                                                    <span className="text-white font-bold">$150K - $250K</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                                                    <span className="text-gray-300">Staff/Principal Engineer</span>
                                                    <span className="text-white font-bold">$250K - $500K+</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-cyan-400">Career Paths</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <Star className="w-5 h-5 text-yellow-400" />
                                                    <span className="text-gray-300">Software Architect</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Star className="w-5 h-5 text-yellow-400" />
                                                    <span className="text-gray-300">Engineering Manager</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Star className="w-5 h-5 text-yellow-400" />
                                                    <span className="text-gray-300">Tech Lead</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <Star className="w-5 h-5 text-yellow-400" />
                                                    <span className="text-gray-300">CTO / VP of Engineering</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                                        <p className="text-green-300 font-medium text-center">
                                            Companies like Google, Amazon, Netflix, and Uber require system design skills for senior engineering positions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Next Lesson CTA */}
                <div className="px-8 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20">
                            <h3 className="text-3xl font-bold text-white mb-6">Ready for the Next Lesson?</h3>
                            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                                Now that you understand what system design is, let's dive into scalability fundamentals and learn how systems handle millions of users.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg text-lg flex items-center space-x-3">
                                    <span>Continue to Scalability Basics</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => toggleSection('lesson-complete')}
                                    className="px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg flex items-center space-x-3"
                                >
                                    {completedSections.has('lesson-complete') ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span>Completed</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Mark as Complete</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer/>
               </div>
        </div>
    );
}