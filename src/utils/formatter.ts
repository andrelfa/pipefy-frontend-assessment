export function formatDate(date: string) {
  return new Date(date).toLocaleDateString().substr(0, 10);
}
