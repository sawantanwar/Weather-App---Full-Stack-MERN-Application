export default function WeatherSummary({ data, convertTemp, tempUnitCelsius }) {
  const {
    main: { humidity, temp_min, temp_max },
    weather,
    wind: { speed },
  } = data;
  const condition = weather[0];

  return (
    <div className="bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-700 rounded-xl p-6 space-y-4 text-white shadow-lg select-none sm:max-w-md sm:mx-auto md:mx-0">
      <div className="text-4xl font-bold tracking-wide">
        {convertTemp(data.main.temp)}&deg;{tempUnitCelsius ? "C" : "F"}
      </div>
      <div className="flex items-center gap-2 capitalize">
        <img
          src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
          alt={condition.description}
          className="w-10 h-10"
        />
        <span>{condition.description}</span>
      </div>
      <div className="uppercase font-semibold">{condition.main}</div>
      <div className="mt-2 text-sm grid grid-cols-2 gap-4">
        <div>Humidity: {humidity}%</div>
        <div>Wind Speed: {speed} m/s</div>
        <div>Min Temp: {convertTemp(temp_min)}&deg;{tempUnitCelsius ? "C" : "F"}</div>
        <div>Max Temp: {convertTemp(temp_max)}&deg;{tempUnitCelsius ? "C" : "F"}</div>
      </div>
    </div>
  );
}
