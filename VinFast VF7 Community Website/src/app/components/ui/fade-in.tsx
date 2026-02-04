import { useEffect, useRef, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'left' | 'right' | 'none';
    duration?: number;
}

export function FadeIn({ children, delay = 0, className = "", direction = 'up', duration = 700 }: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) observer.unobserve(ref.current); // Trigger once
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    const getTransformStyle = () => {
        if (direction === 'up') return 'translateY(30px)';
        if (direction === 'left') return 'translateX(-30px)';
        if (direction === 'right') return 'translateX(30px)';
        return 'none';
    };

    return (
        <div
            ref={ref}
            className={`${className} transition-all ease-out`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : getTransformStyle(),
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`
            }}
        >
            {children}
        </div>
    );
}
