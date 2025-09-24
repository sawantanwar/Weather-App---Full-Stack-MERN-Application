export default function HourlyForecast({ data, convertTemp, tempUnitCelsius }) {
  return (
    <div className="space-y-4 select-none max-w-md sm:max-w-full mx-auto md:mx-0">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Hourly Forecast</h2>
      <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700 rounded-xl flex text-center divide-x divide-gray-300 overflow-hidden select-none shadow-lg md:max-w-5xl mx-auto md:mx-0">
        {data.map((f, index) => (
          <div key={index} className="flex-1 p-3 text-white">
            <div className="text-cyan-300 font-semibold">
              {convertTemp(f.temp)}°{tempUnitCelsius ? "C" : "F"}
            </div>
            <div className="flex items-center justify-center gap-2 capitalize">
              {f.condition}{" "}
              <img
                src={`https://openweathermap.org/img/wn/${f.icon}.png`}
                alt={f.desc}
                className="inline-block"
              />
            </div>
            <div className="uppercase font-semibold">{f.desc}</div>
            <div className="mt-2">{f.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

