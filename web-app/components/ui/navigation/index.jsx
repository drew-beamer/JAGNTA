"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import React from "react";

export default function Nav() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSearchFocus = () => {
    setShowAdvancedSearch(true);
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/notes">
          <h3 className="font-bold text-inherit m-0 p-0">JAGNTA</h3>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[12rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          onFocus={handleSearchFocus}
        />
        {showAdvancedSearch && (
          <Button as={Link} href="/advanced-search">
            Advanced Search
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}

/**
 *         <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
 */
