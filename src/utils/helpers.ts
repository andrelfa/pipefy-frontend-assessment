import camelCase from "lodash.camelcase";
import mapKeys from "lodash.mapkeys";
import { Pipe } from "../types/Pipe";

export function keysToCamelCase(obj: any) {
  return mapKeys(obj, (v, k) => camelCase(k));
}

export function sortPipesByName(pipes: Pipe[]) {
  return pipes.sort((a, b) => {
    const nameA = a.name.toLowerCase().trim();
    const nameB = b.name.toLowerCase().trim();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}
