import { getRegions } from "../../api/compendium";
import useApi from "../../hooks/useApi";
import { Loader } from "../Feedback/Feedback";

const asLabel = (item) => (typeof item === "string" ? item : item?.name ?? "");

function RegionList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="region-list">
      <h3>
        {title} <span className="color-stats">{items.length}</span>
      </h3>
      <ul>
        {items.map((item) => (
          <li key={asLabel(item)} className="capitalize">
            {asLabel(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Régions de Breath of the Wild servies par l'API /regions
function Regions() {
  const { data, loading, error, retry } = useApi(getRegions);

  return (
    <section className="regions">
      <div className="page-header">
        <h2 className="page-title hylia-font text-gold">Regions of Hyrule</h2>
        <span className="color-stats">Breath of the Wild</span>
      </div>

      {loading && <Loader />}
      {error && (
        <p className="txt-align">
          Regions are unavailable right now.{" "}
          <button type="button" className="btn-gold" onClick={retry}>
            Try again
          </button>
        </p>
      )}
      {data && (
        <div className="regions-grid">
          {[...data]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((region) => (
              <details key={region.name} className="region-card">
                <summary>
                  <span className="capitalize">{region.name}</span>
                  <span className="color-stats">
                    {region.shrines?.length ?? 0} shrines · {region.settlements?.length ?? 0} settlements
                  </span>
                </summary>
                <RegionList title="Settlements" items={region.settlements} />
                <RegionList title="Shrines" items={region.shrines} />
                <RegionList title="DLC Shrines" items={region.dlc_shrines} />
              </details>
            ))}
        </div>
      )}
    </section>
  );
}

export default Regions;
