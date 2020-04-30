import { displayText } from './displayFunctions.js'
import { stocks, cryptos } from './ownedAssets.js'
import * as Colors from './colors.js'
import { getCryptos, getStocks } from './middlewares/financeApi.js'
import { getCurrent } from './middlewares/weatherApi.js'
import { isIncreases, getEarnings } from './utils.js'

const main = async () =>
{
    await displayAssets('stocks', stocks)
    // await displayAssets('cryptos', cryptos)

    // TODO meteo
}

const displayAssets = async (type, assets) =>
{
    const currentValues = await (type === 'cryptos' ? getCryptos : getStocks)(assets)

    for (const currentValue of currentValues)
    {
        const asset = assets.find(crypto => crypto.symbol === currentValue.symbol)
        const isIncreasing = isIncreases(currentValue.chg_per)
        const color = isIncreasing ? 'green' : 'red'

        await displayText(asset.title + ' ' + currentValue.price)
        await displayText((isIncreasing ? '↓' : '↑') + ' ' + currentValue.chg_per,
            2, Colors[color].r, Colors[color].g, Colors[color].b, 1)
        await displayText('💰 ' + getEarnings(asset.volume, asset.average, parseInt(currentValue.price)).toFixed(2))
    }
}

export { main }