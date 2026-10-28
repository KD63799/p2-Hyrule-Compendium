import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { GAMES, getAllEntries, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

// Recherche dans tout le compendium du jeu sélectionné (nom, numéro ou catégorie)
const SearchEntries = ({ game, sort, favorites }) => {
  const [searchParams] = useSearchParams();
  const searchValue = (searchParams.get("q") ?? "").trim().toLowerCase();
  const { data, loading, error, retry } = useApi(getAllEntries, game);

  const results = useMemo(() => {
    const entries = (data ?? []).filter(
      (entry) =>
        !searchValue ||
        entry.name.toLowerCase().includes(searchValue) ||
        (searchValue.length >= 3 && entry.category.startsWith(searchValue)) ||
        String(entry.id) === searchValue.replace("#", "").replace(/^0+/, "")
    );
    return sortEntries(entries, sort);
  }, [data, searchValue, sort]);

  return (
    <div className="gros-container">
      <EntriesGrid
        title={searchValue ? `Results for “${searchValue}”` : "All entries"}
        subtitle={GAMES[game].title}
        entries={results}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
        showCategory
        emptyMessage="No result found"
      />
    </div>
  );
};

export default SearchEntries;
