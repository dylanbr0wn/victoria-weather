const Header = () => {
    return (
        <div className="h-16  bg-gray-900 flex-shrink-0">
            <div className=" max-w-3xl mx-auto text-white flex p-2">
                {/* <div className="py-3 text-4xl inline-block"></div> */}
                <div className="py-1 px-2 inline-block rounded-md hover:bg-gray-800 transition-colors">
                    <a href="/" className="block">
                        <img
                            style={{ width: 275 }}
                            src="/500w/weather_logo500.png"
                            alt="victoria weather"
                        ></img>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Header;
