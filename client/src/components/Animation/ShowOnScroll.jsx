import { useEffect, useState } from "react";

const ShowOnScroll = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.33 } // Muncul saat sudah scroll 1/3 bagian container
        );

        const target = document.querySelector("#animated-box");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

    return (
        <div
            id="animated-box"
            className={`transition-all duration-700 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
            {children}
        </div>
    );
};

export default ShowOnScroll;
