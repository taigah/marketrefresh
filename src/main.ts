import { getMarkets } from "./market.ts"

const marketDisplay = [{
  name: "BTC-PERP",
  icon: "💰"
}, {
  name: "ETH-PERP",
  icon: "🍸"
}, {
  name: "BNB-PERP",
  icon: "👑"
}]

const markets = await getMarkets(Array.from(marketDisplay).map(display => display.name))

const lines = []

for (const { name, icon } of marketDisplay) {
  const market = markets.get(name)
  if (market === undefined) continue
  lines.push(`${icon} ${market.price.toFixed(0)}$`)
}

const XDG_DATA_HOME = Deno.env.get("XDG_DATA_HOME") || "~/.local/share"
const filename = `${XDG_DATA_HOME}/crypto/market`

await Deno.writeFile(filename, new TextEncoder().encode(lines.join("\n")))
