export function toInputDateFormat(dateStr) {
  if (!dateStr || dateStr === "null") return null;

  // Accepts DD-MM-YYYY
  const [dd, mm, yyyy] = dateStr.split("-");

  if (!dd || !mm || !yyyy) return null;

  return `${yyyy}-${mm}-${dd}`; // HTML date format
}
