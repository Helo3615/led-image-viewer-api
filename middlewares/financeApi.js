import axios from 'axios'

const prefix = 'https://fcsapi.com/api-v2/'

const request = action =>
{
    const url = `${prefix}${action}&access_key=${process.env.FINANCE_API_KEY}`

    return axios(url)
        .then(res => {
            if (res.data.status) return res.data.response
            throw new Error(res.data.msg)
        })
        .catch(err => {
            console.error('Error on ' + url, err)
        })
}

/**
 * @param stocks array
 * @returns {Promise<* | void>}
 *
 * chg: "+5.51"
 * chg_percent: "10.42%"
 * country: "france"
 * dateTime: "2020-04-29 15:39:00"
 * high: "58.46"
 * id: "69164"
 * low: "51.60"
 * price: "58.39"
 * symbol: "AIR"
 */
const getStocks = async (stocks) =>
{
    const symbols = stocks.map(stock => stock.symbol)

    let data = await request('stock/latest?symbol=' + symbols.join())

    if (data)
        return data.filter(datum =>
        {
            const stockCorresponding = stocks.find(stock => datum.symbol === stock.symbol)

            if (!stockCorresponding) return false

            return datum.country === stockCorresponding.country
        })
    else throw new Error('Request result is incorrect')
}

/**
 * @param cryptos array
 * @returns {Promise<* | void>}
 *
 *    change: "+0.01552"
 *    chg_per: "+8.11%"
 *    id: "83"
 *    last_changed: "2020-04-29 16:16:05"
 *    price: "0.20696"
 *    symbol: "XRP/EUR"
 */
const getCryptos = async (cryptos) =>
{
    const symbols = cryptos.map(crypto => crypto.symbol)

    let data = await request('crypto/latest?symbol=' + symbols.join())

    if (data) return data.filter(datum => cryptos.some(crypto => datum.symbol === crypto.symbol))
    else throw new Error('Request result is incorrect')
}

export { getStocks, getCryptos }