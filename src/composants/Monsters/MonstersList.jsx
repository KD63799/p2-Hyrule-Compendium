import { useMemo } from "react";
import { GAMES, getCategory, getMasterModeEntries, sortEntries } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import EntriesGrid from "../EntriesGrid/EntriesGrid";

function Monsters({ game, sort, favorites }) {
  const { data, loading, error, retry } = useApi(getCategory, "monsters", game);
  // Les variantes Master Mode n'existent que dans Breath of the Wild
  const masterMode = useApi(game === "botw" ? getMasterModeEntries : null);

  const monsters = useMemo(() => sortEntries(data ?? [], sort), [data, sort]);
  const masterModeMonsters = useMemo(
    () => sortEntries(masterMode.data ?? [], sort),
    [masterMode.data, sort]
  );

  return (
    <div className="gros-container">
      <EntriesGrid
        title="Monsters"
        subtitle={GAMES[game].title}
        entries={monsters}
        loading={loading}
        error={error}
        onRetry={retry}
        game={game}
        favorites={favorites}
      />
      {game === "botw" && !loading && !error && (
        <EntriesGrid
          title="Master Mode"
          subtitle="Exclusive variants"
          entries={masterModeMonsters}
          loading={masterMode.loading}
          error={masterMode.error}
          onRetry={masterMode.retry}
          game={game}
          favorites={favorites}
        />
      )}
    </div>
  );
}

export default Monsters;
