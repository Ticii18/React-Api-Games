import { useEffect, useState } from "react";

export function App() {
  const [Games, setGames] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&key=07ec061495604c68b17d4f0eff540211"
    )
      .then((res) => res.json())
      .then((data) => setGames(data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <h1 className="text-amber-950 text-5xl mt-10 m-10 ">Top 10 games of 2019</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-4 w-full max-w-screen-xl">
          {Games.map((game) => (
            <div
              key={game.slug}
              className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg transition-transform duration-500 hover:-translate-y-5 hover:shadow-lg"
            >
              <div className="m-2.5 overflow-hidden rounded-md h-56 flex justify-center items-center">
                <img
                  className="w-full h-full object-cover"
                  src={game.background_image}
                  alt={`Imagen de ${game.name}`}
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                  {game.name}
                </h4>
                <p className="text-sm font-semibold text-slate-500 ">
                  Lanzamiento : {game.released}
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                  Plataforma :{" "}
                  {game.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                  Genero : {game.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
              <div className="flex justify-center p-6 pt-2 gap-7">
                <button
                  className="min-w-32 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
