import FetchService from './FetchService';

class EventService {

    static getEvents = callback => {
        let url = 'https://wydarzenia-b6ffc.firebaseio.com/lista_wydarzen' + '.json';
        FetchService.getData(url, data => callback(data));
    }

    static getEventById = (id, callback) => {
        let url = 'https://wydarzenia-b6ffc.firebaseio.com/lista_wydarzen/' + id + '.json';
        FetchService.getData(url, data => callback(data));
    }

    static sendEvent = data => {
        let url = 'https://wydarzenia-b6ffc.firebaseio.com/lista_wydarzen' + '.json';
        FetchService.sendData(url, data);
    }

    static deleteEventById = id => {
        let url = 'https://wydarzenia-b6ffc.firebaseio.com/lista_wydarzen/' + id + '.json';
        FetchService.deleteData(url);
    }

    static changeEventById = (id, data) => {
        let url = 'https://wydarzenia-b6ffc.firebaseio.com/lista_wydarzen/' + id + '.json';
        FetchService.changeData(url, data);
    }
}

module.exports = EventService;