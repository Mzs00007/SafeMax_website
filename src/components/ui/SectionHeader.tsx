interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center';
    light?: boolean;
}

export default function SectionHeader({ title, subtitle, alignment = 'center', light = false }: SectionHeaderProps) {
    return (
        <div className={`mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-safemax-dark'}`}>
                {title}
            </h2>
            {subtitle && (
                <div className={`w-20 h-1 bg-safemax-orange mb-6 ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
            )}
            {subtitle && (
                <p className={`text-lg max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
