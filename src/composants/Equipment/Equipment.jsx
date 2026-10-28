import { useMemo } from "react";
import { GAMES, getCategory, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

function Equipment({ game, sort, favorites }) {
  const { data, loading, error, retry } = useApi(getCategory, "equipment", game);
  const equipment = useMemo(() => sortEntries(data ?? [], sort), [data, sort]);

  return (
    <div className="gros-container">
      <EntriesGrid
        title="Equipment"
        subtitle={GAMES[game].title}
        entries={equipment}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
      />
    </div>
  );
}

export default Equipment;
