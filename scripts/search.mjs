import { generateSearch } from "../lib/search";

async function main() {
  try {
    await generateSearch();
    console.log("Search file generated successfully");
  } catch (error) {
    console.error("Error generating search file:", error);
    process.exit(1);
  }
}

main();
