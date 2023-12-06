"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import "./typedefs";

/**
 * Responsible for returning a selection that lets the user pick between AND, OR, or NOT
 * @param {Object} props
 * @param {string} props.name selection name for the form
 * @returns 
 */
function OperationSelection({ name, ...props }) {
  return (
    <Select
      className="w-full sm:w-1/3"
      popoverProps={{ className: "prose-ul:p-0 prose-ul:my-0" }}
      name={name}
      {...props}
      label="Operation"
      placeholder="Select operation">
      <SelectItem key={"AND"}>
        AND
      </SelectItem>
      <SelectItem key={"OR"}>
        OR
      </SelectItem>
      <SelectItem key={"NOT"}>
        NOT
      </SelectItem>
    </Select>
  );
}
/**
 * Responsible for returning a search entry row
 * 
 * @param {Object} props
 * @param {Entry} props.entry
 *
 * @returns {import("react").ReactElement}
 */
export default function AdvancedSearchEntry({ name }) {
  return (
    <div className="w-full flex space-x-4">
      <OperationSelection name={name + "-select"} />
      <Input label="Text" placeholder="Search text" className="grow" name={name + "-search"} />
    </div>
  );
}
