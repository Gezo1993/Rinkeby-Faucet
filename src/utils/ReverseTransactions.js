export const ReverseTransactions = (arr) =>
  arr.map((transaction) => arr[arr.length - 1 - arr.indexOf(transaction)]);
