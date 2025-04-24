import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import heroVideo from "../assets/video/hero.mp4";

const videos = [
  // replace with your actual video URLs
  heroVideo,
  heroVideo,
  heroVideo,
  heroVideo,
  heroVideo,
  heroVideo,
];

export default function PortfolioGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const visibleVideos = videos.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Portfolio</h2>
      <div className="relative flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {visibleVideos.map((video, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <video
                src={video}
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentIndex + 3 < videos.length && (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <Dialog
        open={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >
        {selectedVideo && (
          <div className="relative w-full max-w-4xl">
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
