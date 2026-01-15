'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string; // Allow custom positioning classes
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    return (
        <nav className={`flex items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase ${className}`} aria-label="Breadcrumb">
            <Link
                href="/"
                className="flex items-center gap-1 text-white/60 hover:text-white transition-colors duration-200"
            >
                <Home size={14} className="mb-0.5" />
                <span>Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isLink = item.href && item.href !== '#' && !isLast;

                return (
                    <div key={index} className="flex items-center gap-2 text-white/60">
                        <ChevronRight size={14} className="text-white/40" />
                        {isLink ? (
                            <Link
                                href={item.href!}
                                className="hover:text-white transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={`transition-colors duration-200 ${isLast ? 'text-white font-bold pointer-events-none' : ''}`}>
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
