import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCAL_VIDEOS } from "@/lib/constants";

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-br from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="videos-title">
              Video Gallery
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="videos-subtitle">
              Experience our storytelling through motion. Each video captures the essence and emotion of life's most precious moments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {LOCAL_VIDEOS.map((video, index) => (
              <motion.div
                key={video.id}
                className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedVideo(video.id)}
                data-testid={`video-thumbnail-${index}`}
              >
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-accent p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-accent-foreground fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-playfair font-semibold mb-2" data-testid={`video-title-${index}`}>
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`video-description-${index}`}>
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            data-testid="video-modal"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:text-accent"
              onClick={closeModal}
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </Button>

            <motion.div
              className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex items-center justify-center text-white">
                <p className="text-lg">Demo Video Player - Video ID: {selectedVideo}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}