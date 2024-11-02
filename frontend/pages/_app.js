import '../styles.css';
// Remove FullCalendar CSS imports as we'll handle styles in styles.css
import Head from "next/head";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    function adaptViewport() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        adaptViewport();
        window.addEventListener('resize', adaptViewport);
        return () => window.removeEventListener('resize', adaptViewport);
    }, []);

    return (
        <div className="app-container">
            <Head>
                <title>Venture@Brown</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
                />
            </Head>

            <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <motion.div
                    key={router.route}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                        duration: 0.3, 
                        ease: [0.4, 0, 0.2, 1] 
                    }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default MyApp;