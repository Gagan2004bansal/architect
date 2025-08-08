"use client";
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star } from 'lucide-react';

export default function testimonial() {

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
    }

    return (
        <div>
            <Navbar />
            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join thousands of engineers who've transformed their careers
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sarah Chen",
                            role: "Senior SDE at Amazon",
                            company: "Amazon",
                            image: "👩‍💻",
                            testimonial: "The interactive animations made complex concepts crystal clear. Landed my dream job at Amazon after just 3 months!",
                            rating: 5,
                            salaryIncrease: "$40K"
                        },
                        {
                            name: "Raj Patel",
                            role: "Staff Engineer at Google",
                            company: "Google",
                            image: "👨‍💻",
                            testimonial: "Best investment I made for my career. The interview prep was spot-on and helped me crack Google's system design rounds.",
                            rating: 5,
                            salaryIncrease: "$60K"
                        },
                        {
                            name: "Emily Rodriguez",
                            role: "Lead Architect at Netflix",
                            company: "Netflix",
                            image: "👩‍🔬",
                            testimonial: "From fresher to lead architect in 2 years. The hands-on approach and real-world examples were game-changers.",
                            rating: 5,
                            salaryIncrease: "$75K"
                        }
                    ].map((testimonial, index) => (
                        <Card key={index} className="group hover:border-blue-500/50 transition-all transform hover:scale-105">
                            <CardContent>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-4xl">{testimonial.image}</div>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                        <div className="text-xs text-blue-400">{testimonial.company}</div>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6 italic">"{testimonial.testimonial}"</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <Badge variant="success" className="font-semibold">
                                        +{testimonial.salaryIncrease}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
};