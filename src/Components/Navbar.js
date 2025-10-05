import { useState } from 'react';
import { FaSearch, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'; // ← Importar Link


function Navbar() {
  return (
    <>
      <nav className="bg-[#69D6FF] text-white flex items-center justify-between px-8 py-3">
        <ul className="hidden md:flex gap-6 font-semibold">
          <li className="cursor-pointer hover:text-gray-300">Películas</li>
          <li className="cursor-pointer hover:text-gray-300">Alimentos</li>
          <li className="cursor-pointer hover:text-gray-300">Recomendaciones</li>
          <li className="cursor-pointer hover:text-gray-300">Próximos Estrenos</li>
        </ul>

        <div className="flex justify-center items-center">
          <span className=" text-2xl font-bold">CineWatch</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-[#34B0D9] items-center px-3 py-1 rounded-md cursor-pointer">
            <FaMapMarkerAlt className="mr-2" />
            <select className="bg-[#34B0D9] text-white outline-none rounded-md px-2 py-1">
              <option>Elige tu cine</option>
              <option>Cine A</option>
              <option>Cine B</option>
            </select>
          </div>

          <button className="p-2 rounded-md hover:bg-[#34B0D9]">
            <FaSearch />
          </button>

          <button>
          <Link to="/Login" className="p-2 rounded-md hover:bg-[#34B0D9] flex items-center">
           <FaUser />
          </Link>
           
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
