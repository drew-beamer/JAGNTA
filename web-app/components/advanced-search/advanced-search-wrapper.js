"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import AdvancedSearchEntries from "./advanced-search-entries";
import AdvancedSearchResults from "./advanced-search-results";

/**
 * Responsible for managing state of the form and search results
 * 
 * @returns {import("react").ReactElement}
 */
export default function AdvancedSearchWrapper() {
  const [entries, setEntries] = useState(1);
  const [results, setResults] = useState(null);

  const handleEntryExpansion = () => {
    setEntries((e) => e + 1);
  };

  const handleEntryRemoved = () => {
    // Don't let entries go lower than 0
    setEntries((e) => Math.max(0, e - 1));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    let url = "/api/search?";
    // Add search params to the URL
    for (var [key, value] of formData.entries()) {
      url += `${key}=${value}&`;
    }
    // Remove trailing ampersand
    url = url.slice(0, url.length - 1);
    fetch(url)
      .then((res) => res.json())
      .then((json) => setResults(json));
  };

  return (
    <form className="flex space-y-4 flex-wrap" onSubmit={handleFormSubmit}>
      <Input name="main" label="Search" className="w-full" />
      <AdvancedSearchEntries entries={entries} />
      <div className="space-x-4">
        <Button variant="outlined" onClick={handleEntryExpansion}>
          Add Entry
        </Button>
        <Button variant="outlined" onClick={handleEntryRemoved}>
          Remove Entry
        </Button>
        <Button variant="shadow" type="submit">
          Search
        </Button>
      </div>
      {/* Only show result section if search has been run and we have results */}
      {results && results.length > 0 && <AdvancedSearchResults results={results} />}
    </form>
  );
}
