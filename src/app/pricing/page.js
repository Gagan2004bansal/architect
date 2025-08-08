import React from 'react';
import { CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function page() {

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

    return (
        <div>

            <Navbar/>

            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Choose Your Learning Path</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Flexible pricing designed for students and professionals
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Free Starter",
                            price: "$0",
                            period: "forever",
                            description: "Perfect for getting started",
                            features: [
                                "5 Basic System Designs",
                                "Community Access",
                                "Basic Progress Tracking",
                                "Mobile App Access"
                            ],
                            popular: false,
                            cta: "Start Free"
                        },
                        {
                            name: "Pro Learning",
                            price: "$29",
                            period: "month",
                            description: "Most popular for serious learners",
                            features: [
                                "All 50+ System Designs",
                                "AI Interview Simulation",
                                "Advanced Analytics",
                                "Priority Support",
                                "Downloadable Resources",
                                "Certificate of Completion"
                            ],
                            popular: true,
                            cta: "Start Pro Trial"
                        },
                        {
                            name: "Career Boost",
                            price: "$99",
                            period: "month",
                            description: "For professionals seeking promotion",
                            features: [
                                "Everything in Pro",
                                "1-on-1 Expert Sessions",
                                "Custom Learning Path",
                                "Job Referral Network",
                                "Salary Negotiation Guide",
                                "LinkedIn Profile Review"
                            ],
                            popular: false,
                            cta: "Boost Career"
                        }
                    ].map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative group hover:border-blue-500/50 transition-all transform hover:scale-105 ${plan.popular ? 'border-blue-500/50 scale-105' : ''
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardContent className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 mb-6">{plan.description}</p>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">/{plan.period}</span>
                                </div>

                                <Button
                                    className={`w-full mb-8 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}`}
                                    variant={plan.popular ? 'default' : 'outline'}
                                >
                                    {plan.cta}
                                </Button>

                                <div className="space-y-4 text-left">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default page