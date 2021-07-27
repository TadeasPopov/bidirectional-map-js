const BidirectionalMap = require('../dist/bidirectional-map.min.js');
let bidirectionalMap = null;

test('create new BidiractionalMap instance', () => {
	bidirectionalMap = new BidirectionalMap('columns', 'headers');
	expect(bidirectionalMap).toBeInstanceOf(BidirectionalMap);
	expect(bidirectionalMap.name1).toBe('columns');
	expect(bidirectionalMap.name2).toBe('headers');
	expect(bidirectionalMap.map1).toBeInstanceOf(Map);
	expect(bidirectionalMap.map2).toBeInstanceOf(Map);
});

test('set and get String columns keys', () => {
	bidirectionalMap.set('first_name', 'Jméno');
	bidirectionalMap.set('last_name', 'Příjmení');
	bidirectionalMap.set('custom_data', 'Pohlaví');
	bidirectionalMap.set('custom_data', 'Stav');

	expect(bidirectionalMap.get('columns', 'first_name')).toBe('Jméno');
	expect(bidirectionalMap.get('columns', 'last_name')).toBe('Příjmení');
	expect(bidirectionalMap.get('columns', 'custom_data')).toEqual(['Pohlaví', 'Stav']);

	expect(bidirectionalMap.get('headers', 'Jméno')).toBe('first_name');
	expect(bidirectionalMap.get('headers', 'Příjmení')).toBe('last_name');
	expect(bidirectionalMap.get('headers', 'Pohlaví')).toBe('custom_data');
	expect(bidirectionalMap.get('headers', 'Stav')).toBe('custom_data');
});

test('set and get null values', () => {
	bidirectionalMap.set(null, 'Stav');
	bidirectionalMap.set('last_name', null);

	expect(bidirectionalMap.get('headers', 'Stav')).toBeNull();
	expect(bidirectionalMap.get('columns', 'last_name')).toBeNull();
});
