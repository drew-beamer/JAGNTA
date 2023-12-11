"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import AdvancedSearchEntries from "./advanced-search-entries";
import AdvancedSearchEntry from "./advanced-search-entry";

export default function AdvancedSearchWrapper() {
  const [entries, setEntries] = useState(1);

  const handleEntryExpansion = () => {
    setEntries((e) => e + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    let url = "/api/search?"
    for (var [key, value] of formData.entries()) { 
      url += `${key}=${value}&`
    }
    url = url.slice(0, url.length - 1);
    console.log(url)
    fetch(url).then((res) => console.log(res))
  }

  return (
    <form className="flex space-y-4 flex-wrap" onSubmit={handleFormSubmit}>
      <Input name="main" label="Search" className="w-full" />
      {Array(entries)
        .fill(0)
        .map((_, index) => (
          <AdvancedSearchEntry key={`entry${index}`} name={`entry${index}`} />
        ))}
      <div className="space-x-4">
        <Button variant="outlined" onClick={handleEntryExpansion}>
          Add Entry
        </Button>
        <Button variant="shadow" type="submit">Search</Button>
      </div>
    </form>
  );
}
