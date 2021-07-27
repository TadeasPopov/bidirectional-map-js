export class DuplicateError extends Error {}

export function guardType(valueName, value, typeName, type) {
	if (value && value.constructor !== type) {
		throw new TypeError(`${valueName}: ${value} must be of type ${typeName}`);
	}
}

export function guardDuplicate(name1, value1, name2, value2) {
	if (value1 != null && value1 === value2) {
		throw new DuplicateError(`${name1}: ${value1} and ${name2}: ${value2} must not be the same value`);
	}
}

export default class BidirectionalMap {
	constructor(name1 = null, name2 = null) {
		guardType('name1', name1, 'string', String);
		guardType('name2', name2, 'string', String);
		guardDuplicate('name1', name1, 'name2', name2);

		this.map1 = new Map();
		this.map2 = new Map();
		this.name1 = name1;
		this.name2 = name2;
	}

	set(key1, key2) {
		if (key1 == null && key2 == null) return;

		if (key1 != null) {
			if (!this.map1.has(key1)) {
				this.map1.set(key1, [key2]);
			} else {
				if (key2 == null) {
					this.map1.get(key1).forEach((key) => {
						this.map2.set(key, []);
					});
					this.map1.set(key1, []);
				} else if (!this.map1.get(key1).includes(key2)) {
					this.map1.get(key1).push(key2);
				}
			}
		}

		if (key2 != null) {
			if (!this.map2.has(key2)) {
				this.map2.set(key2, [key1]);
			} else {
				if (key1 == null) {
					this.map2.get(key2).forEach((key) => {
						this.map1.set(key, []);
					});
					this.map2.set(key2, []);
				} else if (!this.map2.get(key2).includes(key1)) {
					this.map2.get(key2).push(key1);
				}
			}
		}
	}

	get(name, key) {
		guardType('name', name, 'string', String);

		if (name === this.name1) {
			return this.get1(key);
		} else if (name === this.name2) {
			return this.get2(key);
		}

	}
	get1(key) {
		if (!this.map1.has(key)) return undefined;
		if (this.map1.get(key).length === 0) return null;
		if (this.map1.get(key).length === 1) return this.map1.get(key)[0];
		return this.map1.get(key);
	}
	get2(key) {
		if (!this.map2.has(key)) return undefined;
		if (this.map2.get(key).length === 0) return null;
		if (this.map2.get(key).length === 1) return this.map2.get(key)[0];
		return this.map2.get(key);
	}
}
