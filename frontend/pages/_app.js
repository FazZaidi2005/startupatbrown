import '../styles.css';
import Head from "next/head";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const siteTitle = "Startup@Brown";
    const siteDescription = "Brown University's hub for student entrepreneurship";
    const siteUrl = "https://startupatbrown.com";
    const logoPath = "/resource_images/brown_ep_logo.png";

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
                {/* Basic Meta Tags */}
                <title>{siteTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content={siteDescription} />
                
                {/* Favicons */}
                <link rel="icon" type="image/png" href={logoPath} />
                <link rel="shortcut icon" type="image/png" href={logoPath} />
                <link rel="apple-touch-icon" href={logoPath} />
                
                {/* Open Graph Meta Tags for Facebook, LinkedIn, etc */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={siteTitle} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={`${siteUrl}${logoPath}`} />
                <meta property="og:image:alt" content={`${siteTitle} logo`} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteUrl} />
                <meta name="twitter:creator" content={siteTitle} />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={siteDescription} />
                <meta name="twitter:image" content={`${siteUrl}${logoPath}`} />
                <meta name="twitter:image:alt" content={`${siteTitle} logo`} />

                {/* Additional Meta Tags */}
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-TileImage" content={logoPath} />
                <meta name="msapplication-TileColor" content="#ffffff" />
                
                {/* Font Awesome */}
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
                />

                {/* Preload Important Assets */}
                <link 
                    rel="preload" 
                    href={logoPath} 
                    as="image" 
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
