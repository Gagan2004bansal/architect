"use client";

import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Lock, ArrowRight, BookOpen, Code, Target, Trophy, Medal, ChevronDown, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Curriculum() {
  const [selectedTrack, setSelectedTrack] = useState('beginner');
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2]));

  const tracks = {
    beginner: {
      title: "Beginner Track",
      subtitle: "Perfect for CS students and new developers",
      duration: "8-12 weeks",
      projects: 5,
      color: "green"
    },
    intermediate: {
      title: "Intermediate Track",
      subtitle: "For developers with 1-2 years experience",
      duration: "6-10 weeks",
      projects: 7,
      color: "blue"
    },
    advanced: {
      title: "Advanced Track",
      subtitle: "Senior engineers preparing for FAANG",
      duration: "4-8 weeks",
      projects: 10,
      color: "purple"
    }
  };

  const curriculum = {
    beginner: [
      {
        id: 1,
        title: "Fundamentals of System Design",
        description: "Learn the basics of scalable system architecture",
        duration: "2 weeks",
        lessons: [
          { id: 1, title: "What is System Design?", duration: "30 min", type: "theory", isLocked: false, url: "hld/what_is_system_design" },
          { id: 2, title: "Scalability Basics", duration: "45 min", type: "theory", isLocked: false, url: "hld/scalability_basics" },
          { id: 3, title: "Load Balancing 101", duration: "35 min", type: "practical", isLocked: false, url: "hld/load_balancing" },
          { id: 4, title: "Database Fundamentals", duration: "50 min", type: "practical", isLocked: true, url: "hld/database_fundamentals" }
        ],
        project: "Design a Simple Web Application",
        difficulty: "Easy"
      },
      {
        id: 2,
        title: "Caching and Performance",
        description: "Master caching strategies and performance optimization",
        duration: "2 weeks",
        lessons: [
          { id: 5, title: "Introduction to Caching", duration: "40 min", type: "theory", isLocked: true, url: "what_is_system_design" },
          { id: 6, title: "Redis vs Memcached", duration: "35 min", type: "practical", isLocked: true , url: "what_is_system_design"},
          { id: 7, title: "CDN Implementation", duration: "45 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 8, title: "Cache Invalidation Strategies", duration: "30 min", type: "theory", isLocked: true, url: "what_is_system_design" }
        ],
        project: "Build a Caching Layer",
        difficulty: "Easy"
      },
      {
        id: 3,
        title: "Database Design",
        description: "SQL vs NoSQL, sharding, and database scaling",
        duration: "2 weeks",
        lessons: [
          { id: 9, title: "SQL vs NoSQL", duration: "40 min", type: "theory", isLocked: true, url: "what_is_system_design" },
          { id: 10, title: "Database Sharding", duration: "50 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 11, title: "Replication Strategies", duration: "45 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 12, title: "ACID vs BASE", duration: "35 min", type: "theory", isLocked: true, url: "what_is_system_design" }
        ],
        project: "Design Instagram Database",
        difficulty: "Medium"
      },
      {
        id: 4,
        title: "Messaging Systems",
        description: "Message queues, pub/sub, and real-time communication",
        duration: "2 weeks",
        lessons: [
          { id: 13, title: "Message Queues Basics", duration: "40 min", type: "theory", isLocked: true, url: "what_is_system_design" },
          { id: 14, title: "Kafka vs RabbitMQ", duration: "45 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 15, title: "WebSocket Implementation", duration: "35 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 16, title: "Event-Driven Architecture", duration: "50 min", type: "theory", isLocked: true, url: "what_is_system_design" }
        ],
        project: "Design WhatsApp Messaging",
        difficulty: "Medium"
      },
      {
        id: 5,
        title: "Final Project",
        description: "Design a complete system from scratch",
        duration: "2 weeks",
        lessons: [
          { id: 17, title: "Requirements Gathering", duration: "30 min", type: "theory", isLocked: true, url: "what_is_system_design" },
          { id: 18, title: "System Architecture", duration: "60 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 19, title: "Implementation Planning", duration: "45 min", type: "practical", isLocked: true, url: "what_is_system_design" },
          { id: 20, title: "Presentation & Review", duration: "30 min", type: "theory", isLocked: true, url: "what_is_system_design" }
        ],
        project: "Design Twitter/X",
        difficulty: "Hard"
      }
    ]
  };

  const toggleLesson = (lessonId) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const getCompletionRate = () => {
    const totalLessons = curriculum[selectedTrack].reduce((acc, module) => acc + module.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Curriculum', href: '#', active: true },
    { name: 'Practice', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Resources', href: '#' }
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
        {/* Navigation - Centered with spacing */}
        <Navbar />

        {/* Hero Section */}
        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Design <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Curriculum</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Structured learning path from basics to advanced system design.
              Master the skills that top tech companies demand.
            </p>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Completion", value: `${getCompletionRate()}%`, icon: Trophy },
                { label: "Lessons", value: `${completedLessons.size}/20`, icon: BookOpen },
                { label: "Projects", value: "2/5", icon: Code },
                { label: "Streak", value: "7 days", icon: Medal }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
                    <div className="flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-blue-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(tracks).map(([key, track]) => (
                <div
                  key={key}
                  onClick={() => setSelectedTrack(key)}
                  className={`p-8 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-105 ${selectedTrack === key
                      ? `border-${track.color}-500 bg-${track.color}-500/10 backdrop-blur-sm shadow-2xl shadow-${track.color}-500/20`
                      : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/40 hover:bg-white/10'
                    }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{track.title}</h3>
                  <p className="text-gray-400 mb-6">{track.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        {track.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Target className="w-4 h-4 mr-2" />
                        {track.projects} projects
                      </div>
                    </div>
                    {selectedTrack === key && (
                      <CheckCircle className={`w-8 h-8 text-${track.color}-400`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curriculum Content */}
        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {curriculum[selectedTrack].map((module, moduleIndex) => (
              <div
                key={module.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all"
              >
                {/* Module Header */}
                <div
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="p-8 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-bold text-2xl shadow-lg">
                        {moduleIndex + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                        <p className="text-gray-400 text-lg">{module.description}</p>
                        <div className="flex items-center space-x-6 mt-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${module.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                              module.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                            {module.difficulty}
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            {module.duration}
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            {module.lessons.length} lessons
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-gray-400">Progress</div>
                        <div className="text-white font-bold text-xl">
                          {module.lessons.filter(lesson => completedLessons.has(lesson.id)).length}/{module.lessons.length}
                        </div>
                      </div>
                      {expandedModule === module.id ? (
                        <ChevronDown className="w-8 h-8 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Module Content */}
                {expandedModule === module.id && (
                  <div className="border-t border-white/10">
                    <div className="p-8 space-y-4">
                      {/* Lessons */}
                      <div className="space-y-4">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            
                            className={`flex items-center justify-between p-6 rounded-2xl transition-all ${lesson.isLocked
                                ? 'bg-gray-800/30 border border-gray-700/50'
                                : completedLessons.has(lesson.id)
                                  ? 'bg-green-500/10 border border-green-500/30 hover:bg-green-500/20'
                                  : 'bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transform hover:scale-[1.02]'
                              }`}
                            onClick={() => !lesson.isLocked && toggleLesson(lesson.id)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-12 h-12">
                                {lesson.isLocked ? (
                                  <Lock className="w-6 h-6 text-gray-500" />
                                ) : completedLessons.has(lesson.id) ? (
                                  <CheckCircle className="w-6 h-6 text-green-400" />
                                ) : (
                                  <Play className="w-6 h-6 text-blue-400" />
                                )}
                              </div>
                              <div>
                                <h4 className={`font-semibold text-lg ${lesson.isLocked ? 'text-gray-500' : 'text-white'}`}>
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`text-sm ${lesson.isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {lesson.duration}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.type === 'theory'
                                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    }`}>
                                    {lesson.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!lesson.isLocked && !completedLessons.has(lesson.id) && (
                              <Link href={lesson.url}>
                              <ArrowRight className="w-6 h-6 text-gray-400" />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Project */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-lg">Final Project</h4>
                            <p className="text-purple-300">{module.project}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of developers who've mastered system design with our structured curriculum.
                Start with fundamentals and build your way up to advanced distributed systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth">
                  <button className="px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg text-lg">
                    Start Learning Now
                  </button>
                </Link>
                <button className="px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg">
                  Download Curriculum PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}