"use client"

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PokemonCard } from "./pokemon-card";

interface PokemonGridProps {
    pokemonList: any;
    itemsPerPage: number;
}

export function PokemonGrid({ pokemonList, itemsPerPage }: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const searchFilter = (pokemonList: any) => {
        return pokemonList.filter(
            (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    const filteredPokemonList = searchFilter(pokemonList);

    
    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
    const currentPokemonList = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <h3 className="text-2xl py-6 text-center">PokeFinder</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pokemonName">Pokemon Name</Label>
                    <Input
                        type="text"
                        value={searchText}
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="Search Here"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon List</h3>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
                {currentPokemonList.map((pokemon: any) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}
            </div>

            {/* Pagination */}
            
            <div className="flex justify-center">
                {Array.from({ length: Math.ceil(filteredPokemonList.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 border ${currentPage === index + 1
                                ? 'bg-blue-400 text-black'  // Current page button color
                                : 'bg-black-100 text-white-900' // Non-current page button color
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </>
    );
}
