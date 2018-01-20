export const toArabicNumber = number => {
  let n = number.toString();
  let arabicDigits = ['۰','۱','۲','۳','٤','۵','٦','۷','۸','۹'];
  let arabicNumber = n.replace(/\d/g, (m) => {
    return arabicDigits[parseInt(m)];
  });
  return arabicNumber;
}