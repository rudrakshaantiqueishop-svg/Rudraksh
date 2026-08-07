import { getPublicInspiredItems } from "@/lib/inspired";
import GetInspiredClient from "./GetInspiredClient";

export default async function GetInspired() {
  const items = await getPublicInspiredItems();

  return <GetInspiredClient initialItems={items} />;
}
