import axios from 'axios'

const prefix = 'https://api.openweathermap.org/data/2.5/'
const suffix = '&units=metric'

const request = ressource =>
{
    const url = `${prefix}${ressource}?lat=${process.env.LAT}&lon=${process.env.LON}&appid=${process.env.WEATHER_API_KEY}${suffix}`

    return axios(url)
        .then(res => {
            if (!res.data.message) return res.data
            throw new Error(res.data.message)
        })
        .catch(err => {
            console.error('Error on ' + url, err)
        })
}

/**
 * @returns {Promise<* | void>}
 *
 *   "dt": 1586001851,
 *    "sunrise": 1586003020,
 *    "sunset": 1586048382,
 *    "temp": 280.15,
 *    "feels_like": 277.75,
 *    "pressure": 1017,
 *    "humidity": 93,
 *    "uvi": 9.63,
 *    "clouds": 90,
 *    "visibility": 6437,
 *    "wind_speed": 2.1,
 *    "wind_deg": 70,
 *    "weather": [
 *    {
 *           "id": 501,
 *           "main": "Rain",
 *           "description": "moderate rain",
 *           "icon": "10n"
 *         },
 *    {
 *           "id": 701,
 *           "main": "Mist",
 *           "description": "mist",
 *           "icon": "50n"
 *         }
 *    ],
 *    "rain": {
 *         "1h": 1.02
 *       }
 */
const getCurrent = () => request('onecall').then(res => res.data.current)

export { getCurrent }