import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { LOCAL_IMAGES } from "@/lib/constants";
import ReviewDialog from "@/components/review-dialog";

export default function TestimonialsSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const { data: testimonials, isLoading } = useQuery({
        queryKey: ["/api/testimonials"],
        queryFn: api.testimonials.getAll,
    });

    const validTestimonials = testimonials || [];

    // Auto-slide functionality
    useEffect(() => {
        if (validTestimonials.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % validTestimonials.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [validTestimonials.length]);

    const nextSlide = () => {
        if (validTestimonials.length <= 1) return;
        setCurrentSlide((prev) => (prev + 1) % validTestimonials.length);
    };

    const prevSlide = () => {
        if (validTestimonials.length <= 1) return;
        setCurrentSlide((prev) => (prev - 1 + validTestimonials.length) % validTestimonials.length);
    };

    return (
        <div className="relative overflow-hidden w-full">
            {/* Background Effect for the slider section - Optional, keeping it subtle if integrated into Home */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"
                        style={{ fontFamily: "'Tangerine', cursive" }}
                    >
                        Client Stories
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8 rounded-full" />
                    <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Real experiences from couples and families who trusted us with their most precious moments.
                    </p>

                    {/* Write Review Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8"
                    >
                        <ReviewDialog>
                            <Button className="bg-blue-600/90 hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-blue-600/40 relative overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                <PenTool className="w-5 h-5 mr-3" />
                                Write a Review
                            </Button>
                        </ReviewDialog>
                    </motion.div>
                </motion.div>

                {/* Featured Testimonial Slider */}
                {isLoading ? (
                    <div className="max-w-5xl mx-auto h-96 bg-gray-900/50 rounded-3xl animate-pulse flex items-center justify-center border border-white/5">
                        <div className="text-gray-500 flex flex-col items-center gap-2">
                            <Star className="w-8 h-8 animate-spin" />
                            <span>Loading stories...</span>
                        </div>
                    </div>
                ) : validTestimonials.length > 0 ? (
                    <div className="max-w-6xl mx-auto relative">
                        <div className="relative overflow-hidden p-4 sm:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/10 relative group"
                                >
                                    <Quote className="absolute top-8 left-8 w-16 h-16 text-blue-500/10 rotate-180" />

                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                                        <div className="flex-shrink-0 relative">
                                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                                            <img
                                                src={validTestimonials[currentSlide].clientImage || LOCAL_IMAGES.testimonials[0]}
                                                alt={validTestimonials[currentSlide].clientName}
                                                className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-gray-800 shadow-2xl relative z-10"
                                            />
                                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full border-4 border-gray-800 z-20">
                                                <Quote className="w-4 h-4 fill-current" />
                                            </div>
                                        </div>

                                        <div className="flex-1 text-center md:text-left min-w-0">
                                            <div className="flex justify-center md:justify-start mb-6 space-x-1">
                                                {Array.from({ length: validTestimonials[currentSlide].rating }).map((_, i) => (
                                                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current drop-shadow-md" />
                                                ))}
                                            </div>

                                            <blockquote className="text-xl sm:text-3xl text-gray-100 mb-8 font-light italic leading-relaxed break-words" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                                "{validTestimonials[currentSlide].body}"
                                            </blockquote>

                                            <div>
                                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1 break-words">
                                                    {validTestimonials[currentSlide].clientName}
                                                </h3>
                                                <p className="text-gray-400 font-medium tracking-wide text-sm uppercase flex items-center justify-center md:justify-start gap-2">
                                                    <span className="w-8 h-[1px] bg-blue-500/50" />
                                                    {validTestimonials[currentSlide].eventType}
                                                    {validTestimonials[currentSlide].location && ` • ${validTestimonials[currentSlide].location}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="pointer-events-auto bg-black/40 hover:bg-blue-600 text-white rounded-full w-14 h-14 backdrop-blur-md border border-white/10 hover:border-transparent transition-all shadow-lg hover:scale-110"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="pointer-events-auto bg-black/40 hover:bg-blue-600 text-white rounded-full w-14 h-14 backdrop-blur-md border border-white/10 hover:border-transparent transition-all shadow-lg hover:scale-110"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </Button>
                            </div>
                        </div>

                        {/* Indicators */}
                        <div className="flex justify-center gap-3 mt-8">
                            {validTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-2 bg-gray-700 hover:bg-gray-500'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-16 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-[2.5rem] border border-white/5 backdrop-blur-sm max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-2">No stories yet</h3>
                        <p className="text-gray-400 text-lg mb-8">Be the first to share your experience with us!</p>
                        <ReviewDialog>
                            <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:text-white hover:bg-blue-500">
                                Write a Review
                            </Button>
                        </ReviewDialog>
                    </div>
                )}
            </div>
        </div>
    );
}
