
import { unlinkSync } from "fs";
import { join } from "path";

const filesToDelete: string[] = [];

let deleted = 0;
for (const file of filesToDelete) {
    try {
        unlinkSync(join(process.cwd(), file));
        deleted++;
    } catch(e) {
        console.error("Failed to delete", file, e);
    }
}
console.log("Successfully deleted " + deleted + " files.");
