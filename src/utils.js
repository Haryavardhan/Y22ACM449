const used = new Set();

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isPositiveInteger = (value) => {
  return /^\d+$/.test(value) && Number(value) > 0;
};

export const isValidSlug = (slug) => {
  return /^[a-zA-Z0-9-_]{3,20}$/.test(slug);
};

export const generateCode = () => {
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8);
  } while (used.has(code));
  return code;
};

export const isUnique = (code) => !used.has(code);

export const reserveCode = (code) => used.add(code);
