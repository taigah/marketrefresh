export interface Market {
  name: string,
  change24h: number,
  price: number
}

export async function getMarkets(names: string[]): Promise<Map<string, Market>> {
  const body = await fetch("https://ftx.com/api/markets").then(res => res.json())
  if (! body.success) {
    throw new Error("Request failed")
  }
  const map = new Map<string, Market>();
  for (const market of body.result) {
    if (names.includes(market.name)) {
      const { name, change24h, price } = market
      map.set(market.name, { name, change24h, price })
    }
  }
  return map
}
