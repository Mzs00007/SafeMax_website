'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    category: string;
    description: string;
    imageUrl?: string;
    href?: string;
}

export default function ProjectCard({ title, category, description, imageUrl, href }: ProjectCardProps) {
    return (
        <div className="group relative rounded-xl overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">

            {/* Background Image */}
            <div className="absolute inset-0">
                {imageUrl ? (
                    // Using simple div for background if Next/Image is too complex with remote patterns without config
                    // But since it's local asset usage:
                    <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-800" />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-safemax-orange text-xs font-bold tracking-wider uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {category}
                </span>
                <h3 className="text-white text-xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">
                    {description}
                </p>
            </div>

        </div>
    );
}
