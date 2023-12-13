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
  return Array(entries)
    .fill(0)
    .map((_, index) => (
      <AdvancedSearchEntry key={`entry${index}`} name={`entry${index}`} />
  ));
}
