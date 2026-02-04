import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { HomePage } from '@/app/components/home-page';
import { MapPage } from '@/app/components/map-page';
import { CommunityPage } from '@/app/components/community-page';
import { NewsEventsPage } from '@/app/components/news-events-page';
import { ContactPage } from '@/app/components/contact-page';

const pageOrder = ['/', '/map', '/community', '/news', '/contact'];

export function AnimatedRoutes() {
    const location = useLocation();
    const prevPath = useRef(location.pathname);

    // Calculate direction synchronously during render based on previous path in ref
    let direction = 0;
    const prevIndex = pageOrder.indexOf(prevPath.current);
    const currIndex = pageOrder.indexOf(location.pathname);

    if (prevIndex !== -1 && currIndex !== -1 && prevIndex !== currIndex) {
        direction = currIndex > prevIndex ? 1 : -1;
    }

    useEffect(() => {
        // Update ref after render for the next transition
        prevPath.current = location.pathname;
    }, [location.pathname]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            position: 'absolute' as const, // Fix layout shift
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative' as const,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            position: 'absolute' as const,
        }),
    };

    return (
        <div className="relative w-full flex-1 overflow-x-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                    key={location.pathname}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full min-h-full"
                >
                    <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/news" element={<NewsEventsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
