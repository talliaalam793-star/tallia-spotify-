import React from "react";

export default function AlbumGrid({ albums, onAlbumClick }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {albums.map((album, index) => (
        <div
          key={index}
          className="cursor-pointer hover:scale-105 transition"
          onClick={() => onAlbumClick(album)}
        >
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-40 object-cover rounded-xl shadow-md"
          />
          <h3 className="text-white text-sm mt-2 font-semibold truncate">
            {album.title}
          </h3>
          <p className="text-gray-400 text-xs">{album.artist}</p>
        </div>
      ))}
    </div>
  );
}
