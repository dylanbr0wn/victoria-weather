const Footer = () => {
    return (
        <footer className="flex items-center justify-center w-full h-24 bg-gray-900 text-gray-500">
            <div className="text-gray-500">
                Made by{" "}
                <a
                    className="inline-block hover:underline font-bold text-pink-600"
                    href="https://dylanbrown.space"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Dylan Brown
                </a>{" "}
                using{" "}
                <a
                    className="inline-block hover:underline font-bold text-green-800"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.victoriaweather.ca/"
                >
                    victoriaweather.ca
                </a>
            </div>
        </footer>
    );
};
export default Footer;
