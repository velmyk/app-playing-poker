export default class MemoryStore {

    constructor(defaultState = {}) {
        this._defaultState = defaultState;
        this._data = this._getDefaultState();
        this._isStored = false;
    }

    get() {
        return this._data;
    }

    isStored() {
        return this._isStored;
    }

    update(dataUpdates) {
        var oldData = angular.copy(this._data);
        angular.copy(dataUpdates, this._data);

        if (this.onUpdate) {
            this.onUpdate(this._data, oldData);
        }

        this._isStored = true;

        return this._data;
    }

    clear() {
        this.update(this._getDefaultState());
        this._isStored = false;
    }

    _getDefaultState() {
        return angular.copy(this._defaultState);
    }
}