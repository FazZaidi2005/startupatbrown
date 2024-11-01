import '../styles.css';
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
            </Head>

            {/* Smooth Page Transitions */}
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={router.route}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default MyApp;
