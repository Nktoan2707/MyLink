const { getTop10Drivers, getStatisticsFromDateToDate, getRevenueToday, totalRevenuesEachMonth, totalRevenuesEachCities } = require('../controller/statisticsController');

export default function statisticsAPI(app) {
    app.get('/statistics/driver-tops', getTop10Drivers);
    app.post('/statistics/revenue', getStatisticsFromDateToDate);
    app.get('/statistics/revenue/today', getRevenueToday);
    app.get('/statistics/revenue/total/months', totalRevenuesEachMonth);
    app.get('/statistics/revenue/total/cites', totalRevenuesEachCities);
}