import Range from './range-tuple.js';

const typename = (self) => self.constructor.name;

function _calcAbs(self, num) {
    return self.range.delta * num + self.range.min;
}
function _calcRel(self, num) {
    return (num - self.range.min) / self.range.delta;
}

export default class NormalNum {
    get abs() {
        return this._raw;
    }
    get rel() {
        return _calcRel(this, this._raw);
    }

    set abs(num) {
        this._raw = Number(num);
    }
    set rel(num) {
        if (this.range.valid) this._raw = _calcAbs(this, num);
        else throw `${typename(this)}: invalid range`;
    }

    constructor(max) {
        let range;

        if (max instanceof Range) {
            range = max;
        } else {
            range = new Range(0, max);
        }

        this.abs = range.max;
        this.range = range;
    }

    // extras

    get srel() {
        return this.rel * 2 - 1;
    }
    set srel(num) {
        this.rel = (num + 1) / 2;
    }

    get over() {
        return this.rel > 1;
    }
    get under() {
        return this.rel < 0;
    }
    get bounded() {
        return !(this.over || this.under);
    }

    rescale() {
        if (this.under) {
            this.range.min = this.abs;
        } else if (this.over) {
            this.range.max = this.abs;
        }
    }
    relative() {
        return this.rel.toLocaleString();
    }
}
