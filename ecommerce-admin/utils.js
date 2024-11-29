export function toTitleCase(str) {
  if(str.trim() === 'XL') return str;
  return str.replace(/\w\S*/g, function (txt) {
    console.log(
      "Text:",
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase().trim()
    );
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase().trim();
  });
}

