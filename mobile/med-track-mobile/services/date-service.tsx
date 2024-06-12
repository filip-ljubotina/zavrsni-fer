export function getCurrentDateFormatted(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
