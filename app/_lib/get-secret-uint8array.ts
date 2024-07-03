export const getSecretUint8Array = (secretKey: string) => {
  const senderSecretKeyStringArray = secretKey.split(",");
  senderSecretKeyStringArray[0] = senderSecretKeyStringArray[0].replace(
    "[",
    ""
  );
  senderSecretKeyStringArray[senderSecretKeyStringArray.length - 1] =
    senderSecretKeyStringArray[senderSecretKeyStringArray.length - 1].replace(
      "]",
      ""
    );

  const senderSecretKeyUint8Array = Uint8Array.from(
    senderSecretKeyStringArray.map((n) => {
      return Number(n);
    })
  );

  return senderSecretKeyUint8Array;
};
