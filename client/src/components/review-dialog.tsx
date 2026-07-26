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
            <DialogContent className="bg-black/95 border border-[hsl(38,92%,58%)]/20 text-white backdrop-blur-xl sm:max-w-[600px] shadow-2xl">
                <DialogHeader className="mb-2">
                    <div className="mx-auto w-12 h-12 bg-[hsl(38,92%,58%)]/10 rounded-full flex items-center justify-center mb-2 border border-[hsl(38,92%,58%)]/30">
                        <Star className="w-6 h-6 text-[hsl(38,92%,58%)] fill-[hsl(38,92%,58%)]" />
                    </div>
                    <DialogTitle className="text-3xl text-center gradient-text-gold mb-1" style={{ fontFamily: "'Tangerine', cursive" }}>Share Your Experience</DialogTitle>
                    <DialogDescription className="text-center text-white/40">
                        We'd love to hear about your experience with us.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white/60 text-sm">Your Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(38,92%,58%)] to-[hsl(30,70%,45%)] rounded-lg opacity-10 blur transition-opacity group-hover:opacity-20" />
                                <Input
                                    id="name"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[hsl(38,92%,58%)]/50 transition-all relative z-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="eventType" className="text-white/60 text-sm">Event Type <span className="text-white/25 text-xs">(Optional)</span></Label>
                            <Input
                                id="eventType"
                                value={newReview.eventType}
                                onChange={(e) => setNewReview({ ...newReview, eventType: e.target.value })}
                                placeholder="e.g. Wedding"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[hsl(38,92%,58%)]/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white/60 text-sm">Rating</Label>
                        <div className="flex justify-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`focus:outline-none transition-colors ${star <= newReview.rating ? "text-[hsl(38,92%,58%)]" : "text-white/20"
                                        }`}
                                >
                                    <Star className={`w-7 h-7 ${star <= newReview.rating ? "fill-current" : ""}`} />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="review" className="text-white/60 text-sm">Your Review</Label>
                        <Textarea
                            id="review"
                            value={newReview.review}
                            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                            placeholder="Tell us what you liked..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[hsl(38,92%,58%)]/50 transition-all h-[100px] resize-none"
                        />
                    </div>

                    <Button
                        onClick={handleReviewSubmit}
                        disabled={submitReviewMutation.isPending}
                        className="btn-gold w-full py-4 text-base rounded-xl transition-all shadow-lg"
                    >
                        {submitReviewMutation.isPending ? (
                            <span className="flex items-center justify-center gap-1.5">
                                <span className="w-2 h-2 bg-black/60 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-black/60 rounded-full animate-bounce [animation-delay:0.1s]" />
                                <span className="w-2 h-2 bg-black/60 rounded-full animate-bounce [animation-delay:0.2s]" />
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
