import { EventEmitter } from 'events';
import constants from '../constants/appConstants';

export default class BaseStore extends EventEmitter {

    constructor(...args) {
        super(...args);
        this.data = new Set([]);
    }

    emitChange() {
        this.emit(constants.CHANGED);
    }

    addChangeListener(callback) {
        this.on(constants.CHANGED, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(constants.CHANGED, callback);
    }

    update(id, data) {
        for (let item of this.data) {
            if (id === item.id) {
                Object.assign(item, data);
            }
        }

        this.emitChange();
    }

    setAll(items) {
        this.data = new Set(items);
        this.emitChange();
    }

    getAll() {
        return Array.from(this.data);
    }

    getById(id) {
        let result;
        for (let item of this.data) {
            if (id === item.id) {
                result = item;
            }
        }

        return result;
    }

    set(item) {
        if (!this.data.has(item)) {
            this.data.add(item);
            this.emitChange();
        }
    }

    remove(item) {
        this.data.delete(item);
        this.emitChange();
    }

    removeById(id) {
        let item = this.getById(id);
        this.data.delete(item);

        this.emitChange();
    }
}