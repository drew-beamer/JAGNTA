"use client";

import AdvancedSearchResults from "@/components/advanced-search/advanced-search-results";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResults() {
  const params = useSearchParams();
  const [results, setResults] = useState(undefined);

  useEffect(() => {
    console.log(params.get("search"))
    fetch(`/api/basic-search?search=${params.get("search")}`)
      .then((res) => res.json())
      .then((json) => setResults(json));
  }, [params]);

  return results ? (
    <AdvancedSearchResults results={results} />
  ) : (
    <div>Loading...</div>
  );
}
