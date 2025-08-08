"use client"

import Link from "next/link";
import {  BookOpen, X, Menu} from 'lucide-react';
import {React, useState} from 'react';


export default function Navbar() {

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Curriculum', href: '/curriculum', active: true },
    { name: 'Practice', href: '#' },
    { name: 'Community', href: '#' }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-8">
      <nav className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">architect.io</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 ${item.active
                    ? 'text-blue-400 bg-blue-400/10 px-4 py-2 rounded-lg border border-blue-400/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all'
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${item.active
                      ? 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all">
                    Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
