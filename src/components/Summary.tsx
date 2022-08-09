import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { weatherIcon } from "../utils/helper";
import { DashProp } from "../utils/types";
import { getPointsData, getWeatherData } from "../utils/apiGetters";

const Summary = ({ dash = false }: DashProp) => {
	const { data } = useQuery(["weather"], getWeatherData);

	const { data: pointsData } = useQuery(["points"], getPointsData, {});

	return (
		<>
			{data && pointsData && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className={`w-full ${dash ? "" : " p-3"}`}
					key="summary"
				>
					<div
						className={`${
							dash ? "p-3 flex" : "p-5 "
						} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col `}
					>
						<div className="flex justify-center">
							<div className="text-7xl mr-8 flex flex-col text-center ">
								<div>{weatherIcon(data.current.condition.code).icon}</div>
							</div>
							<div
								className={` flex flex-col ${
									pointsData?.average_temp < 10
										? "text-blue-500"
										: pointsData?.average_temp < 20
										? "text-yellow-400"
										: pointsData?.average_temp < 30
										? "text-green-500"
										: "text-red-600"
								}`}
							>
								<div
									className={` tracking-wide text-6xl font-black text-center`}
								>
									{pointsData?.average_temp.toFixed(1)}
									<span className="text-4xl font-light">℃</span>
								</div>
								<div className="text-lg font-light leading-3 text-center">
									Current Temperature
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row w-full md:space-x-2 mt-8 pb-5">
						{data.forecast.forecastday.map((day) => {
							return (
								<div
									key={day.date}
									className={`flex flex-col ${
										dash ? "p-1" : "p-3"
									}  space-y-2 flex-grow rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
								>
									<div className="flex text-center">
										<div className="text-slate-500 text-lg  leading-none">
											{dayjs(day.date).format("ddd")}{" "}
											{dayjs(day.date).format("D")}{" "}
											{dayjs(day.date).format("MMM")}
										</div>
									</div>

									<div
										className={`flex ${
											dash ? "flex-col" : ""
										} justify-between space-x-3`}
									>
										<div className={"flex"}>
											<div
												className={`${
													dash ? "text-2xl" : " text-3xl"
												} mr-3 flex flex-col text-center `}
											>
												<div>{weatherIcon(day.day.condition.code).icon}</div>
											</div>
											<div
												className={` flex flex-col  ${
													day.day.avgtemp_c < 10
														? "text-blue-500"
														: day.day.avgtemp_c < 20
														? "text-yellow-400"
														: day.day.avgtemp_c < 30
														? "text-green-500"
														: "text-red-600"
												}`}
											>
												<div
													className={` tracking-wide ${
														dash ? "text-3xl" : "text-4xl"
													}  leading-none font-black text-center`}
												>
													{day.day.avgtemp_c}
													<span className="text-2xl font-light">℃</span>
												</div>
											</div>
										</div>

										<div
											className={`flex ${
												dash ? " justify-evenly" : "flex-col justify-between"
											} leading-none  h-full`}
										>
											<div className="text-orange-500 font-light">
												<b className="font-black mr-1">H:</b>
												{day.day.maxtemp_c}
											</div>
											<div className="text-sky-500 font-light">
												<b className="font-black mr-1">L:</b>
												{day.day.mintemp_c}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</motion.div>
			)}
		</>
	);
};
export default Summary;
