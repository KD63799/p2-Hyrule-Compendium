import { useMemo } from "react";
import { GAMES, getCategory, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

function Treasure({ game, sort, favorites }) {
  const { data, loading, error, retry } = useApi(getCategory, "treasure", game);
  const treasures = useMemo(() => sortEntries(data ?? [], sort), [data, sort]);

  return (
    <div className="gros-container">
      <EntriesGrid
        title="Treasure"
        subtitle={GAMES[game].title}
        entries={treasures}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
      />
    </div>
  );
}

export default Treasure;
