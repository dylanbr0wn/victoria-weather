/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Header = () => {
	return (
		<div className="h-16  bg-gray-900 flex-shrink-0">
			<div className=" max-w-3xl mx-auto text-white flex pb-2 pt-4">
				{/* <div className="py-3 text-4xl inline-block"></div> */}
				<div className="py-1 px-2 inline-block rounded-md hover:bg-gray-800 transition-colors">
					<Link href="/" className="block">
						<a>
							<img
								style={{ width: 275 }}
								src="/500w/weather_logo500.png"
								alt="victoria weather"
							/>
						</a>
					</Link>
				</div>
				{/* <div className="flex-grow"></div>
                <a
                    href="https://github.com/dylanbr0wn/victoria-weather"
                    target={"_blank"}
                    className=""
                >
                    <div className="py-3 px-4 text-sky-500 font-black rounded-md hover:bg-gray-800 transition-colors">
                        GitHub
                    </div>
                </a> */}
			</div>
		</div>
	);
};
export default Header;
