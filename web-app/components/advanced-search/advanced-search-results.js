import Link from "next/link";

/**
 * Responsible for returning a single result
 *
 * Function is not exported, but used in the AdvancedSearchResults component
 *
 * @param {object} props
 * @param {Result} props.result
 * @returns {import("react").ReactElement}
 */
function AdvancedSearchResult({ result }) {
  return (
    <div className="mb-4" key={`note-${result.id}`}>
      <Link
        className="no-underline hover:underline text-sky-500"
        target="_blank"
        href={`/note/${result.id}`}>
        <h3 className="p-0 m-0 ">{result.title}</h3>
      </Link>
      <p className="p-0 m-0">{result.content.slice(0, 100).trim()}...</p>
      {result.word ? (
        <p className="text-sm mt-2 mb-0 text-neutral-400">
          {result.word.toLowerCase()} is mentioned {result.main_count} time
          {result.main_count !== 1 ? "s" : null}
        </p>
      ) : (
        <p className="text-sm mt-2 mb-0 text-neutral-400">
          Relevant word(s) are mentioned {result.words_count} time
          {result.words_count !== 1 ? "s" : null}
        </p>
      )}
    </div>
  );
}

/**
 * Responsible for returning the results section.
 *
 * Creates list of results and displays them. Default export.
 *
 * @param {object} props
 * @param {Array<Result>} props.results
 * @returns {import("react").ReactElement}
 */
export default function AdvancedSearchResults({ results }) {
  return (
    <section>
      <h2>Results</h2>
      {results.map((result) => (
        <AdvancedSearchResult result={result} />
      ))}
    </section>
  );
}
