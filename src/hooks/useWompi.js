import { use, useEffect, useState } from "react";

const useWompi = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(document.getElementById("wompi-widget-script")) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = "wompi-widget-script";
        script.src = "https://checkout.wompi.co/widget.js";
        script.async = true;
        script.onload = () => setIsLoaded(true);
        document.body.appendChild(script); 
    }, []);

    return {isLoaded};
};

export default useWompi;