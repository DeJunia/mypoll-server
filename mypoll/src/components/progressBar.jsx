import React, { useEffect, useRef, useState } from "react";

const GradientProgressBar = ({ value }) => {
    const [isInView, setIsInView] = useState(false);
    const [displayedValue, setDisplayedValue] = useState(0);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.5 } // Adjust the threshold as needed
        );

        if (progressBarRef.current) {
            observer.observe(progressBarRef.current);
        }

        return () => {
            if (progressBarRef.current) {
                observer.unobserve(progressBarRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 1000; // Animation duration in milliseconds
            const increment = end / (duration / 16); // Increment per frame (assuming ~60fps)

            const animate = () => {
                start += increment;
                if (start >= end) {
                    setDisplayedValue(end);
                } else {
                    setDisplayedValue(Math.floor(start));
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }
    }, [isInView, value]);

    return (
        <div className="progressPg">
            <div ref={progressBarRef} style={styles.container}>
            <div
                style={{
                    ...styles.progress,
                    width: `${displayedValue}%`,
                    background: "linear-gradient(to right, #c471f5 0%, #fa71cd 100%)",
                }}
            >
                
            </div>
            {/* Optional: Display the progress value */}
            
        </div>
        <p>{displayedValue}%</p>
        </div>
        
    );
};

const styles = {
    container: {
        width: "100%",
        height: "5px",
        backgroundColor: "var(--primary-colorCLI)",
        borderRadius: "8px",
        overflow: "hidden",
    },
    progress: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "black",
        borderRadius: "8px",
    },
};

export default GradientProgressBar;
