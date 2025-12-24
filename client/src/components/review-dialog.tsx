import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ReviewDialogProps {
    children: React.ReactNode;
}

export default function ReviewDialog({ children }: ReviewDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newReview, setNewReview] = useState({
        name: "",
        rating: 5,
        review: "",
        eventType: ""
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const submitReviewMutation = useMutation({
        mutationFn: api.testimonials.submit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
            setIsDialogOpen(false);
            setNewReview({ name: "", rating: 5, review: "", eventType: "" });
            toast({
                title: "Review Submitted! 🎉",
                description: "Thank you for sharing your experience with us.",
                className: "bg-green-600 text-white border-green-700"
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to submit review. Please try again.",
                variant: "destructive",
            });
        },
    });

    const handleReviewSubmit = () => {
        if (newReview.name.trim() && newReview.review.trim()) {
            submitReviewMutation.mutate(newReview);
        } else {
            toast({
                title: "Validation Error",
                description: "Please fill in your name and review.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-black/95 border border-white/10 text-white backdrop-blur-xl sm:max-w-[600px] shadow-2xl">
                <DialogHeader className="mb-2">
                    <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-2 border border-blue-500/20">
                        <Star className="w-6 h-6 text-blue-400 fill-blue-400" />
                    </div>
                    <DialogTitle className="text-2xl text-center text-white mb-1" style={{ fontFamily: "'Tangerine', cursive" }}>Share Your Experience</DialogTitle>
                    <DialogDescription className="text-center text-gray-400">
                        We'd love to hear about your experience with us.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg opacity-20 blur transition-opacity group-hover:opacity-40" />
                                <Input
                                    id="name"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all relative z-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="eventType" className="text-gray-300">Event Type <span className="text-gray-500 text-xs">(Optional)</span></Label>
                            <Input
                                id="eventType"
                                value={newReview.eventType}
                                onChange={(e) => setNewReview({ ...newReview, eventType: e.target.value })}
                                placeholder="e.g. Wedding"
                                className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Rating</Label>
                        <div className="flex justify-center gap-2 p-3 bg-gray-900/50 rounded-xl border border-white/5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`focus:outline-none transition-colors ${star <= newReview.rating ? "text-yellow-400" : "text-gray-700"
                                        }`}
                                >
                                    <Star className={`w-6 h-6 ${star <= newReview.rating ? "fill-current" : ""}`} />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="review" className="text-gray-300">Your Review</Label>
                        <Textarea
                            id="review"
                            value={newReview.review}
                            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                            placeholder="Tell us what you liked..."
                            className="bg-gray-900/80 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 transition-all h-[100px] resize-none"
                        />
                    </div>

                    <Button
                        onClick={handleReviewSubmit}
                        disabled={submitReviewMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 text-lg rounded-xl transition-all shadow-lg hover:shadow-blue-600/30"
                    >
                        {submitReviewMutation.isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                            </span>
                        ) : (
                            "Submit Review"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
