export default function FormattedPrice(price: string) {
  const convertedPrice = Number.parseInt(price, 10);
  let formattedPrice;

  if (convertedPrice < 100) {
    formattedPrice = convertedPrice.toFixed(2);
  }

  if (convertedPrice >= 100 && convertedPrice < 1000) {
    formattedPrice = price;
  }

  if (convertedPrice >= 1000 && convertedPrice < 10000) {
    formattedPrice = (convertedPrice / 1000).toLocaleString('en-US');
  }

  return <>${formattedPrice} USD</>;
}
