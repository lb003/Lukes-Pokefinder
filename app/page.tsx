
import { PokemonGrid } from "@/components/pokemongrid";
import { getPokemonList } from "@/lib/PokemonAPI";

export default async function Home() {
    const itemsPerPage = 18;
    const pokemonList = await getPokemonList();

    return (
        <PokemonGrid pokemonList={pokemonList} itemsPerPage={itemsPerPage} />
    );
}
