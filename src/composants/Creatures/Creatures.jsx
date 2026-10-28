import { useMemo } from "react";
import { GAMES, getCategory, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

function Creatures({ game, sort, favorites }) {
  const { data, loading, error, retry } = useApi(getCategory, "creatures", game);
  const creatures = useMemo(() => sortEntries(data ?? [], sort), [data, sort]);

  return (
    <div className="gros-container">
      <EntriesGrid
        title="Creatures"
        subtitle={GAMES[game].title}
        entries={creatures}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
      />
    </div>
  );
}

export default Creatures;
