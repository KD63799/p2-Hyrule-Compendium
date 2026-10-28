import { useMemo } from "react";
import { GAMES, getCategory, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

function Materials({ game, sort, favorites }) {
  const { data, loading, error, retry } = useApi(getCategory, "materials", game);
  const materials = useMemo(() => sortEntries(data ?? [], sort), [data, sort]);

  return (
    <div className="gros-container">
      <EntriesGrid
        title="Materials"
        subtitle={GAMES[game].title}
        entries={materials}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
      />
    </div>
  );
}

export default Materials;
