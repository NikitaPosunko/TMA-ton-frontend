//
// ------------------------------- convert nanotons to TON ---------------------------------- //
//

export function fromNano(nanotons: string) {
  const nanotonsBigInt = BigInt(nanotons);
  const nanosPerTonBigInt = BigInt(1e9);

  const wholeTonsBigInt = nanotonsBigInt / nanosPerTonBigInt;
  const remainderBigInt = nanotonsBigInt % nanosPerTonBigInt;

  // Convert the remainder to a string with leading zeros to ensure it has 9 digits
  const remainderString = remainderBigInt.toString().padStart(9, "0");

  // Take the first 2 digits of the remainder string for the fractional part
  const fractionString = remainderString.slice(0, 2);

  return `${wholeTonsBigInt}.${fractionString}`;
}
