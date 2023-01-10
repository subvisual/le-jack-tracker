export default function extractJSON(text: string) {
  const innerJSON = text.substring(47).slice(0, -2);

  return JSON.parse(innerJSON);
}
