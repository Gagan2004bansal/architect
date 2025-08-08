"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play, BookOpen, Zap, Users, Globe, Database, Server, Monitor, Star, Clock, Trophy, Target, ArrowRight, Smartphone, Tablet, CheckCircle, Video, TrendingUp, Pause, Volume2, VolumeX, RotateCcw, Download
} from 'lucide-react';
import Footer from './components/Footer';

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-700 text-gray-300",
    success: "bg-green-500/20 text-green-300",
    warning: "bg-yellow-500/20 text-yellow-300",
    destructive: "bg-red-500/20 text-red-300",
    secondary: "bg-blue-500/20 text-blue-300"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-800",
    secondary: "bg-gray-800 text-gray-300 hover:bg-gray-700"
  };

  const sizes = {
    default: "px-6 py-3",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all transform hover:scale-105 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-gray-800 rounded-full h-2 ${className}`}>
    <div
      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const Tabs = ({ children, defaultValue, onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, onTabChange, className = "" }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 p-1 ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, onTabChange })
    )}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, onTabChange }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === value
        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
        : 'text-gray-400 hover:text-gray-300'
      }`}
    onClick={() => onTabChange(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => {
  if (activeTab !== value) return null;
  return <div className="mt-6">{children}</div>;
};

export default function SystemDesignPlatform() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const hldTopics = [
    {
      id: 1,
      title: "Design WhatsApp",
      difficulty: "Medium",
      duration: "45 min",
      concepts: ["WebSocket", "Message Queue", "Database Sharding", "CDN"],
      description: "Learn to design a real-time messaging system handling billions of messages",
      students: 12500,
      rating: 4.9,
      completionRate: 87,
      image: "💬",
      prerequisites: ["Basic Database Knowledge", "Understanding of APIs"],
      learningOutcomes: ["Real-time communication", "Scalable messaging", "Data consistency"]
    },
    {
      id: 2,
      title: "Design YouTube",
      difficulty: "Hard",
      duration: "60 min",
      concepts: ["Video Streaming", "CDN", "Transcoding", "Recommendation Engine"],
      description: "Master video streaming architecture and content delivery at scale",
      students: 8900,
      rating: 4.8,
      completionRate: 72,
      image: "📺",
      prerequisites: ["Media Processing", "Advanced Caching"],
      learningOutcomes: ["Video processing", "Content delivery", "Recommendation systems"]
    },
    {
      id: 3,
      title: "Design URL Shortener",
      difficulty: "Easy",
      duration: "30 min",
      concepts: ["Load Balancer", "Caching", "Database Design", "Rate Limiting"],
      description: "Perfect starting point to understand scalable web services",
      students: 18700,
      rating: 4.9,
      completionRate: 94,
      image: "🔗",
      prerequisites: ["Basic Web Knowledge"],
      learningOutcomes: ["URL encoding", "Caching strategies", "Rate limiting"]
    },
    {
      id: 4,
      title: "Design Uber",
      difficulty: "Hard",
      duration: "55 min",
      concepts: ["Geolocation", "Real-time Matching", "Payment Systems", "Surge Pricing"],
      description: "Complex real-time location-based service design",
      students: 7200,
      rating: 4.7,
      completionRate: 68,
      image: "🚗",
      prerequisites: ["Geospatial Systems", "Real-time Processing"],
      learningOutcomes: ["Location services", "Real-time matching", "Dynamic pricing"]
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: "Understand Requirements",
      icon: Target,
      desc: "Break down functional & non-functional requirements",
      color: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      title: "Estimate Scale",
      icon: Globe,
      desc: "Calculate users, data, and traffic patterns",
      color: "from-green-500 to-green-600"
    },
    {
      step: 3,
      title: "Design Components",
      icon: Server,
      desc: "Identify core services and their interactions",
      color: "from-purple-500 to-purple-600"
    },
    {
      step: 4,
      title: "Deep Dive",
      icon: Database,
      desc: "Database design, APIs, and detailed architecture",
      color: "from-orange-500 to-orange-600"
    },
    {
      step: 5,
      title: "Scale & Monitor",
      icon: Monitor,
      desc: "Handle bottlenecks, monitoring, and scaling strategies",
      color: "from-red-500 to-red-600"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Theory",
      desc: "Step-by-step explanations with real-world context and trade-offs",
      color: "from-blue-500 to-cyan-500",
      details: "Comprehensive learning modules with visual aids and practical examples"
    },
    {
      icon: Zap,
      title: "Live Animations",
      desc: "Watch data flow through your system design in real-time",
      color: "from-yellow-500 to-orange-500",
      details: "Dynamic visualizations showing system behavior under different scenarios"
    },
    {
      icon: Users,
      title: "Interview Simulation",
      desc: "Practice with AI interviewer asking follow-up questions",
      color: "from-green-500 to-emerald-500",
      details: "Mock interviews with real-time feedback and performance analytics"
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      desc: "Track your learning journey and identify weak areas",
      color: "from-purple-500 to-pink-500",
      details: "Detailed analytics and personalized learning recommendations"
    }
  ];

  const demoSteps = [
    { title: "Load Balancer", status: "active", delay: 0 },
    { title: "Web Servers", status: "processing", delay: 1000 },
    { title: "Database", status: "waiting", delay: 2000 },
    { title: "Cache Layer", status: "waiting", delay: 3000 }
  ];

  const deviceMockups = [
    { type: "desktop", icon: Monitor, name: "Desktop Experience" },
    { type: "tablet", icon: Tablet, name: "Tablet Optimized" },
    { type: "mobile", icon: Smartphone, name: "Mobile First" }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full filter blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <div className="mb-8">
              <h1 className='text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4'>
                architect.io
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
                <Badge variant="secondary">✨ New: AI-Powered Learning</Badge>
                {/* <Badge variant="success">🚀 50k+ Students</Badge> */}
              </div>
            </div>

            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Master <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">System Design</span>
              <br />
              <span className="text-4xl text-gray-300">Like Never Before</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary interactive platform with real-time animations, AI-powered interviews,
              and hands-on practice. Transform from beginner to system design expert with our proven methodology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/auth">
                <Button size="lg" className="group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Video className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Interactive Topics", value: "50+", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
                { label: "System Designs", value: "25+", icon: Server, color: "from-green-500 to-emerald-500" },
                { label: "Success Rate", value: "94%", icon: Trophy, color: "from-yellow-500 to-orange-500" },
                { label: "Avg. Salary Boost", value: "$25K+", icon: TrendingUp, color: "from-purple-500 to-pink-500" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="group hover:border-blue-500/50 transition-all transform hover:scale-105">
                    <CardContent className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Learning Path */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Proven Learning Method</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Follow our structured approach used by thousands of successful engineers
          </p>
        </div>


        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {learningPath.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative group flex">
                <Card className="hover:border-blue-500/50 transition-all transform hover:scale-105 hover:-translate-y-2 flex-1 flex flex-col">
                  <CardContent className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-blue-400 mb-2">Step {step.step}</div>
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>

                {index < learningPath.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Topics Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Popular System Design Topics</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master real-world systems with our interactive learning modules
          </p>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              {hldTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="group hover:border-blue-500/50 transition-all cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <CardContent>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{topic.image}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {topic.title}
                          </h3>
                          <Badge
                            variant={
                              topic.difficulty === 'Easy' ? 'success' :
                                topic.difficulty === 'Medium' ? 'warning' : 'destructive'
                            }
                            className="mt-1"
                          >
                            {topic.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold">{topic.rating}</span>
                        </div>
                        <div className="text-sm text-gray-400">{topic.students.toLocaleString()} students</div>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                      {topic.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {topic.concepts.map((concept, index) => (
                        <Badge key={index} variant="secondary" className="hover:bg-blue-500/30 transition-colors">
                          {concept}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Completion Rate</span>
                        <span>{topic.completionRate}%</span>
                      </div>
                      <Progress value={topic.completionRate} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {topic.duration}
                      </span>
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Start Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be filtered versions of the same topics */}
          <TabsContent value="beginner">
            <div className="grid md:grid-cols-2 gap-8">
              {hldTopics.filter(topic => topic.difficulty === 'Easy').map((topic) => (
                <Card key={topic.id} className="hover:border-green-500/50 transition-all">
                  <CardContent>
                    <div className="text-4xl mb-4">{topic.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                    <p className="text-gray-400 mb-4">{topic.description}</p>
                    <Badge variant="success">{topic.difficulty}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intermediate">
            <div className="grid md:grid-cols-2 gap-8">
              {hldTopics.filter(topic => topic.difficulty === 'Medium').map((topic) => (
                <Card key={topic.id} className="hover:border-yellow-500/50 transition-all">
                  <CardContent>
                    <div className="text-4xl mb-4">{topic.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                    <p className="text-gray-400 mb-4">{topic.description}</p>
                    <Badge variant="warning">{topic.difficulty}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 gap-8">
              {hldTopics.filter(topic => topic.difficulty === 'Hard').map((topic) => (
                <Card key={topic.id} className="hover:border-red-500/50 transition-all">
                  <CardContent>
                    <div className="text-4xl mb-4">{topic.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                    <p className="text-gray-400 mb-4">{topic.description}</p>
                    <Badge variant="destructive">{topic.difficulty}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Students Love Our Platform</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge features designed for maximum learning effectiveness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:border-blue-500/50 transition-all transform hover:scale-105 cursor-pointer"
              >
                <CardContent className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
                    {feature.desc}
                  </p>
                  {(
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <p className="text-xs text-gray-500">{feature.details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enhanced Interactive Demo */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-blue-500/30">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">See It In Action</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Experience our revolutionary interactive animations. Watch complex systems
                  come to life with real-time data flow visualization, bottleneck identification,
                  and scaling decision simulations.
                </p>

                <div className="flex gap-4 mb-8">

                  <Button onClick={handlePlayDemo} className="group">
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isPlaying ? 'Pause Demo' : 'Start Demo'}
                  </Button>
                  <Button variant="outline" onClick={resetDemo}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Demo Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-blue-400 font-semibold mb-1">Active Users</div>
                    <div className="text-2xl text-white">1.2M+</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-green-400 font-semibold mb-1">Uptime</div>
                    <div className="text-2xl text-white">99.9%</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-black border-gray-700">
                  <CardContent>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm ml-2">System Architecture Simulator</span>
                    </div>

                    <div className="space-y-6">
                      {[
                        { name: "Load Balancer", color: "blue", requests: "15K req/s" },
                        { name: "Web Servers", color: "purple", instances: "12 instances" },
                        { name: "Database Cluster", color: "green", connections: "2.5K active" },
                        { name: "Cache Layer", color: "orange", hitRate: "94% hit rate" },
                        { name: "CDN Network", color: "pink", bandwidth: "50GB/s" }
                      ].map((component, index) => (
                        <div key={component.name} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full bg-${component.color}-500 ${isPlaying ? 'animate-pulse' : ''
                              } transition-all duration-300`}></div>
                            <div>
                              <div className={`font-medium ${component.color === 'blue' ? 'text-blue-300' :
                                  component.color === 'purple' ? 'text-purple-300' :
                                    component.color === 'green' ? 'text-green-300' :
                                      component.color === 'orange' ? 'text-orange-300' :
                                        'text-pink-300'
                                }`}>
                                {component.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {component.requests || component.instances || component.connections || component.hitRate || component.bandwidth}
                              </div>
                            </div>
                          </div>
                          <div className={`flex space-x-1 ${isPlaying ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 h-4 bg-gradient-to-t from-${component.color}-600 to-${component.color}-400 rounded-full ${isPlaying ? 'animate-pulse' : ''
                                  }`}
                                style={{
                                  animationDelay: `${(index + i) * 100}ms`,
                                  height: isPlaying ? `${Math.random() * 16 + 8}px` : '8px'
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Data Flow Animation */}
                    <div className="mt-8 relative">
                      <div className="text-sm text-gray-400 mb-4">Real-time Data Flow</div>
                      <div className="relative h-20 bg-gray-900 rounded-lg overflow-hidden">
                        {isPlaying && (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2 animate-ping"
                                style={{
                                  left: `${(progress + i * 20) % 120}%`,
                                  animationDelay: `${i * 200}ms`
                                }}
                              />
                            ))}
                          </>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-xs text-gray-600">
                            {isPlaying ? `Processing ${Math.floor(progress * 100)} requests...` : 'Click Start Demo to see data flow'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 max-w-4xl mx-auto">
          <CardContent className="p-12">
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                  System Design Skills?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 50,000+ engineers who've accelerated their careers with our proven methodology.
                Start your journey today with our comprehensive system design mastery program.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href="/auth">
                <Button size="lg" className="group text-lg px-10 py-4 cursor-pointer">
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Your Journey Today - Free
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/curriculum">
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 cursor-pointer">
                <Download className="w-5 h-5 mr-3" />
                Download Curriculum
              </Button>
              </Link>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Just Sign Up</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant Access</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}