export function validateMessage(raw) {
  if (typeof raw !== "string") {
    return { ok: false, error: "Le message doit être une chaîne de caractères" };
  }
  const value = raw.trim();
    if (value === "") {
        return { ok: false, error: "Les message ne peuvent pas être vides" }
    }
    if (value.length > 280) {
        return { ok: false, error: "Les message ne peuvent pas dépasser 280 caractères" }
    }
    return { ok: true, value };
}