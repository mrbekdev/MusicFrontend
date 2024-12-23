import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

const UserPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        const validSongs = res.data.filter(
          (song) => song.name && song.file && song.image
        );
        setSongs(validSongs);
      } catch (err) {
        setError("Qo'shiqni olishda muammo yuz berdi!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Qo'shiqlar Kutubxonasi</h1>
      </header>

      <div className="p-4">
        {isLoading && <p className="text-gray-600 text-center">Yuklanmoqda...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!isLoading && !error && (
          <ul className="space-y-4">
            {songs.map((song) => (
              <li
                key={song.id}
                className="bg-white shadow-md rounded-md p-4 flex items-center justify-between relative"
              >
                {/* Qo'shiq rasmi va ma'lumot */}
                <div className="flex items-center space-x-4">
                  <img
                    src={song.image}
                    alt={song.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold">{song.name}</p>
                    <p className="text-sm text-gray-500">Davomiylik: 3:00</p>
                  </div>
                </div>

                {/* Audio pleyer joylashuvi */}
                {currentSong?.id === song.id && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-[50%] w-2/3">
                    <ReactAudioPlayer
                      src={currentSong.file}
                      controls
                      className=""
                    />
                  </div>
                )}

                {/* Eshitish tugmasi */}
                <button
                  onClick={() => handlePlay(song)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserPage;
