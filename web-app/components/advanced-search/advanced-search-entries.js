"use client";

import AdvancedSearchEntry from "./advanced-search-entry";
import "./typedefs";

/**
 *
 * @param {object} props
 * @param {Array<Entry>} props.entries
 * @returns
 */

export default function AdvancedSearchEntries({ entries }) {
  console.log(entries)
  return (
    <>
      {entries?.map((entry, index) => (
        <AdvancedSearchEntry key={index} entry={entry} />
      ))}
    </>
  );
}
