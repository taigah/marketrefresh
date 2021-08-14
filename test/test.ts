import { getMarkets } from "../src/market.ts"
import * as assert from "../deps/assert.ts"
import { intersect } from "../deps/collections.ts"

Deno.test("empty list", async () => {
  const markets = await getMarkets([])
  assert.equal(markets.size, 0)
})

Deno.test("one", async () => {
  const marketName = "BTC-PERP"
  const markets = await getMarkets([ marketName ])
  assert.equal(markets.size, 1)
  assert.equal(markets.get(marketName)!.name, marketName)
})

Deno.test("two", async () => {
  const marketNames = [ "BTC-PERP", "ETH-PERP" ]
  const markets = await getMarkets(marketNames)
  assert.equal(markets.size, 2)
  const retrievedNames = Array.from(markets.values()).map(market => market.name)
  assert.equal(marketNames.length, retrievedNames.length)
  assert.equal(intersect(marketNames, retrievedNames).length, marketNames.length)
})
