// export function convertToSerializableObject(leanDocument) {
//  for (const key of Object.keys(leanDocument)) {
//     if (leanDocument[key].toJSON && leanDocument[key].toString) {
//         leanDocument[key] = leanDocument[key].toString();
//     }
//  }
//     return leanDocument;
// }

export function convertToSerializableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];

    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function" &&
      typeof value.toString === "function"
    ) {
      leanDocument[key] = value.toString();
    }
  }

  return leanDocument;
}