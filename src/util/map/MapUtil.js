export const MapUtil = {
    getCovidPoints: function (points) {
        let total = 0;
        if (!points) {
            return {total};
        }
        const nations = {
            type: "nation"
        };
        const states = {
            type: "state"
        };

        for (const point of points) {
            if (Number.isNaN(point.stats.confirmed)) {
                console.error(point);
            }
            total += point.stats.confirmed;

            nations[point.country] = nations[point.country] || {
                confirmed: 0,
                deaths: 0,
                recovered: 0
            };
            nations[point.country].confirmed += point.stats.confirmed;
            nations[point.country].deaths += point.stats.deaths;
            nations[point.country].recovered += point.stats.recovered;
            nations[point.country].coordinates = nations[point.country].coordinates || point.coordinates;

            states[point.country] = states[point.country] || {};
            states[point.country][point.province] = states[point.country][point.province] || {
                confirmed: 0,
                deaths: 0,
                recovered: 0
            };
            states[point.country][point.province].confirmed += point.stats.confirmed;
            states[point.country][point.province].deaths += point.stats.deaths;
            states[point.country][point.province].recovered += point.stats.recovered;
            states[point.country][point.province].coordinates = states[point.country][point.province].coordinates || point.coordinates;
        }
        const result = {total};
        let i = 1;
        for (; i <= 4; i++) {
            result[i] = nations;
        }
        for (; i <= 9; i++) {
            result[i] = states;
        }
        for (; i <= 20; i++) {
            result[i] = points;
        }
        return result;
    },
    inBoundary: function (bounds, coordinates) {
    return coordinates && bounds && bounds.nw && bounds.se && ((coordinates.longitude >= bounds.nw.lng && coordinates.longitude <= bounds.se.lng) || (coordinates.longitude <= bounds.nw.lng && coordinates.longitude >= bounds.se.lng))
        && ((coordinates.latitude >= bounds.se.lat && coordinates.latitude <= bounds.nw.lat) || (coordinates.latitude <= bounds.se.lat && coordinates.latitude >= bounds.nw.lat));
}
};