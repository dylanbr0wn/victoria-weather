import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";

const Moon = () => {
    const [moonPosition, setMoonPosition] = useState(0);

    useEffect(() => {
        const getPosition = () => {
            let sunset = getSunset(48.45, -123.4).getTime();
            let sunrise = getSunrise(48.45, -123.4).getTime();
            const now = Date.now();

            if (sunrise < now && sunset < now) {
                sunrise += 86400000;
                sunset += 86400000;
            }

            const isNight = !!(sunset < now && now < sunrise);

            let percentComplete = 0;
            if (isNight) {
                percentComplete = (now - sunset) / (sunrise - sunset);
            } else {
                percentComplete = (now - sunrise) / (sunrise - sunset);
            }

            return percentComplete;
        };
        setMoonPosition(getPosition());
    }, []);

    const sinPosition = (complete) => {
        return -Math.sin(complete * Math.PI) * 60;
    };

    const complete = useMotionValue(0);
    const y = useTransform(complete, (complete) => sinPosition(complete));
    const x = useTransform(complete, (complete) => complete * 200);
    const opacity = useTransform(
        complete,
        (complete) => complete / moonPosition
    );

    // useEffect(() => y.onChange((y) => console.log(y)), []);

    const onClick = () => {
        // console.log(moonPosition);
        animate(complete, moonPosition, {
            // onUpdate: (val) => console.log(val),
            duration: 1.5,
        });
    };

    return (
        <div className="w-full p-3">
            <div
                onClick={onClick}
                className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex items-end"
            >
                <div className="text-5xl">☀️</div>
                <div style={{ width: 250 }}>
                    <motion.div
                        className="text-6xl pt-24"
                        style={{ x, y, opacity }}
                    >
                        🌕
                    </motion.div>
                </div>

                <div className="text-5xl">🌙</div>
            </div>
        </div>
    );
};
export default Moon;
