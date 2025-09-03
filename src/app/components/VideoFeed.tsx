import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content mb-2">
              {videos.length > 0 ? 'Latest Videos' : 'Video Collection'}
            </h2>
            {videos.length > 0 && (
              <p className="text-base-content/60">
                Discover {videos.length} amazing video{videos.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {videos.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-base-content/50">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>{videos.length} video{videos.length !== 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
          {videos.map((video, index) => (
            <div 
              key={video._id?.toString()} 
              className="animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full">
          {/* Enhanced Empty State */}
          <div className="text-center py-20 px-6">
            <div className="max-w-md mx-auto">
              {/* Empty State Icon */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-base-200 to-base-300 rounded-full flex items-center justify-center relative overflow-hidden">
                  <svg 
                    className="w-12 h-12 text-base-content/30" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                    />
                  </svg>
                  
                  {/* Animated background rings */}
                  <div className="absolute inset-0 border border-base-content/10 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border border-base-content/5 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Empty State Text */}
              <h3 className="text-xl font-semibold text-base-content mb-3">
                No videos available
              </h3>
              <p className="text-base-content/60 mb-6 leading-relaxed">
                It looks like there are no videos to display right now. Check back later or try uploading some content!
              </p>

              {/* Call to Action */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ready to upload your first video?
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 text-xs text-base-content/40">
                  <span className="px-2 py-1 bg-base-200 rounded">MP4</span>
                  <span className="px-2 py-1 bg-base-200 rounded">MOV</span>
                  <span className="px-2 py-1 bg-base-200 rounded">AVI</span>
                  <span className="px-2 py-1 bg-base-200 rounded">WebM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}