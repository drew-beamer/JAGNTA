import AdvancedSearch from "@/components/advanced-search"

/**
 * Responsible for rendering the Advanced Search Page
 * @returns a RSC containing the page contents
 */
export default function AdvancedSearchPage() {
    return <main className="mx-auto max-w-xl w-full py-12">
        <h1>Advanced Search</h1>
        <AdvancedSearch />
    </main>
}