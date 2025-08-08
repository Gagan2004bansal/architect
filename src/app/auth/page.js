"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { BookOpen, Chrome, Apple, Loader2, ArrowLeft, Shield, CheckCircle, Users, Zap } from 'lucide-react';

const CLIENT_ID = "173852556484-3c302oeh2nqs108mqhn936f8sn5m6fs7.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.upload ";

export default function AuthPage({ role = "student" }) {
  // Mock Redux dispatch and navigate for demonstration
  const dispatch = (action) => {
    console.log('Redux Action Dispatched:', action);
  };
  const navigate = (path) => {
    console.log('Navigating to:', path);
  };

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [tokenClient, setTokenClient] = useState(null);
  const [user, setUser] = useState(null);

  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Get started immediately with one-click authentication'
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with thousands of developers learning system design'
    }
  ];

  // Initialize Google OAuth
  const onGoogleClientLoad = async () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (response) => {
        console.log('Google OAuth Response:', response);
        const accessToken = response.access_token;
        const userDetails = await fetchUserDetails(accessToken);
        console.log('User Details:', userDetails);

        setUser({ ...userDetails, accessToken });
        await callBackend(role, userDetails, accessToken);
      },
    });

    setTokenClient(client);
    console.log('Google OAuth client initialized');
  };

  useEffect(() => {
    const initializeGoogleClient = () => {
      console.log('Initializing Google Client for role:', role);

      // Check if script already exists
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        if (window.google) {
          onGoogleClientLoad();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = onGoogleClientLoad;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    };

    initializeGoogleClient();
  }, [role]);

  const fetchUserDetails = async (token) => {
    try {
      console.log('Fetching user details with token:', token);
      const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await res.json();
      console.log('Fetched user data:', userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      return null;
    }
  };

  const callBackend = async (role, userDetails, accessToken) => {
    try {
      console.log("Calling backend with:", { role, userDetails, accessToken });

      const response = await fetch("http://localhost:3000/api/auth/loginwithgoogle", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email,
          fullName: userDetails.name,
          role: role,
        }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      // Update Redux store (simulated)
      dispatch({
        type: 'user/login',
        payload: {
          user: data.user,
          role: data.user.role,
          googleToken: accessToken
        }
      });

      // Show success screen
      setLoading(null);
      setShowSuccess(true);

      // Log success and redirect after delay
      console.log('Login successful! User data stored in Redux.');
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        console.log('Final user state:', {
          user: data.user,
          role: data.user.role,
          googleToken: accessToken
        });
        navigate("/dashboard"); // or your desired route
      }, 2000);

    } catch (error) {
      console.error("Error calling backend:", error);
      setLoading(null);
      // You might want to show an error state here
    }
  };

  const handleGoogleLogin = () => {
    if (tokenClient) {
      console.log('Starting Google OAuth flow for role:', role);
      setLoading('google');
      setSelectedProvider('google');
      tokenClient.requestAccessToken();
    } else {
      console.error('Google token client not initialized');
    }
  };

  const handleAppleLogin = () => {
    console.log('Apple login not implemented yet');
    setLoading('apple');
    setSelectedProvider('apple');

    // Simulate Apple OAuth (you'll need to implement actual Apple Sign-In)
    setTimeout(() => {
      setLoading(null);
      console.log('Apple login would be implemented here');
    }, 2000);
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: Chrome,
      color: 'bg-red-500 hover:bg-red-600',
      borderColor: 'border-red-200 hover:border-red-300',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      handler: handleGoogleLogin
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: Apple,
      color: 'bg-black hover:bg-gray-800',
      borderColor: 'border-gray-300 hover:border-gray-400',
      textColor: 'text-black',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      handler: handleAppleLogin
    }
  ];

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
            {/* Logo */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white ml-3">Architect.io</span>
            </div>

            {/* Success Animation */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-green-400/30"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Welcome to architect.io!</h1>
            <p className="text-gray-300 mb-6">
              {isLogin ? 'Successfully signed in' : 'Account created successfully'}!
              Redirecting to your dashboard...
            </p>

            {/* User Info Display */}
            {user && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  {user.picture && (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="text-left">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Provider Info */}
            {selectedProvider && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center">
                  <Chrome className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">Connected via {selectedProvider === 'google' ? 'Google' : 'Apple'}</span>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            <div className="flex items-center justify-center text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span>Loading your dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full filter blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-lg">
            {/* Logo & Title */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white ml-3">Architect.io</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Master System Design
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of developers learning to build scalable systems.
              From fundamentals to advanced distributed architecture.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            {/* <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { label: 'Students', value: '50K+' },
                { label: 'Lessons', value: '200+' },
                { label: 'Success Rate', value: '94%' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Mobile Logo */}
              <div className="flex justify-center items-center mb-8 lg:hidden">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white ml-2">Architect.io</span>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome back' : 'Get started today'}
                </h2>
                <p className="text-gray-400">
                  {isLogin
                    ? 'Sign in to continue your learning journey'
                    : 'Create your account and start learning system design'
                  }
                </p>
              </div>

              {/* Role Indicator */}
              <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                <p className="text-blue-300 text-sm">
                  Signing in as: <span className="font-semibold capitalize">{role}</span>
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-4 mb-8">
                {oauthProviders.map((provider) => {
                  const Icon = provider.icon;
                  const isLoading = loading === provider.id;

                  return (
                    <button
                      key={provider.id}
                      onClick={provider.handler}
                      disabled={loading}
                      className={`w-full flex items-center justify-center px-6 py-3 border-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isLoading
                        ? 'bg-white/20 border-white/30 cursor-not-allowed'
                        : `${provider.bgColor} ${provider.borderColor} ${provider.textColor} hover:shadow-lg`
                        }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin text-white" />
                          <span className="text-white">Connecting...</span>
                        </>
                      ) : (
                        <>
                          <Icon className="w-5 h-5 mr-3" />
                          <span>{isLogin ? 'Continue' : 'Sign up'} with {provider.name}</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={loading}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors disabled:opacity-50"
                >
                  {isLogin ? 'Create an account' : 'Sign in instead'}
                </button>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Secure OAuth Authentication</p>
                    <p className="text-gray-400 text-xs">
                      Your data is protected. We never store your passwords and use industry-standard OAuth 2.0 protocols.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-gray-500 mt-6">
                By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
              </p>
            </div>

            {/* Back to site link */}
            <div className="text-center mt-6">
              <Link href="/">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to architect.io
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}