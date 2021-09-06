import { IStock } from '../../../../models/stock.models';

export const responseMapper = (data: unknown & object): Array<IStock> => {
    const resItems = data['Time Series (1min)'];

    if (!resItems) {
        return [];
    }

    return Object.keys(resItems).map(timestampString => ({
        timestamp: timestampString,
        data: {
            high: resItems[timestampString]['2. high'],
            low: resItems[timestampString]['3. low']
        }
    }));
};