'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Share2, X, MoreVertical, Copy, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeInUp from '@/components/animations/FadeInUp';

// --- Types ---
type Video = {
    id: string;
    url: string;
    title: string; // We might fetch this or just placeholder
    thumbnail?: string;
};

// --- Config ---
const VIDEOS_DATA: Video[] = [
    {
        id: '3uJhucq3qnA',
        url: 'https://www.youtube.com/watch?v=3uJhucq3qnA',
        title: 'SafeMax Operational Excellence'
    },
    {
        id: 'y7kvTO_e0-U',
        url: 'https://www.youtube.com/watch?v=y7kvTO_e0-U',
        title: 'Engineering The Neural Network'
    }
];

export default function VideoGallery() {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    return (
        <section className="py-24 relative z-10 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeInUp>
                    <SectionHeader
                        title="Featured Projects & Insights"
                        subtitle="Watch our engineering teams in action across the UAE."
                    />
                </FadeInUp>

                {/* Collage Grid - Auto Adjusting */}
                <div className="mt-12">
                    <div className={`grid gap-6 ${VIDEOS_DATA.length === 1 ? 'grid-cols-1' :
                        VIDEOS_DATA.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {VIDEOS_DATA.map((video, index) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                index={index}
                                onPlay={() => setSelectedVideo(video)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

// --- Video Card Component ---
function VideoCard({ video, index, onPlay }: { video: Video, index: number, onPlay: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // High Res Thumbnail
    const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: video.title,
                    url: video.url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(video.url);
            alert('Link copied to clipboard!');
        }
        setMenuOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(video.url);
        setMenuOpen(false);
        // Could add a toast here
        alert('Link copied!');
    };

    return (
        <FadeInUp delay={index * 0.1}>
            <motion.div
                className="relative group rounded-2xl overflow-hidden aspect-video shadow-xl cursor-pointer bg-black"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMenuOpen(false); }}
                onClick={(e) => {
                    // Prevent click if menu is being interacted with
                    if ((e.target as HTMLElement).closest('.menu-trigger')) return;
                    onPlay();
                }}
            >
                {/* Thumbnail Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${thumbUrl})` }}
                ></div>

                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300"></div>

                {/* Play Button Center */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        <Play fill="currentColor" size={24} className="ml-1" />
                    </motion.div>
                </div>

                {/* Title and Info (Bottom Left) */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                    <span className="inline-block px-2 py-1 bg-safemax-orange text-white text-[10px] font-bold uppercase rounded mb-2 tracking-wider">Video</span>
                    <h3 className="text-white font-bold text-xl leading-tight drop-shadow-md max-w-sm line-clamp-2">{video.title}</h3>
                </div>

                {/* Top Right Dropdown (Share) */}
                <div className="absolute top-4 right-4 z-30 menu-trigger">
                    <div className="relative">
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-safemax-orange transition-colors border border-white/10"
                        >
                            {menuOpen ? <X size={18} /> : <MoreVertical size={18} />}
                        </motion.button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleShare(); }}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-safemax-orange flex items-center gap-3 transition-colors"
                                    >
                                        <Share2 size={16} /> Share Video
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-safemax-orange flex items-center gap-3 transition-colors"
                                    >
                                        <Copy size={16} /> Copy Link
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </FadeInUp>
    );
}

// --- Video Modal Component ---
// --- Video Modal Component ---
import { createPortal } from 'react-dom';

function VideoModal({ video, onClose }: { video: Video, onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling on unmount
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2147483647] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10"
                onClick={(e) => e.stopPropagation()} // Click inside doesn't close
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </motion.div>

            {/* Repositioned Close Button - Bottom Center */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="mt-8 group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-safemax-orange transition-all border border-white/20 hover:border-safemax-orange hover:scale-105"
            >
                <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                    <X size={20} />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">Close Player</span>
            </motion.button>
        </motion.div>,
        document.body
    );
}
