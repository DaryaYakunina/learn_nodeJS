import {existsSync, writeFileSync, readFileSync, mkdirSync} from 'node:fs'; //модуль для работы с файловой системой
import { basename, dirname, join } from 'node:path'; //модуль для работы с каталогами

export default class DataSource {
    
    storage = []; // хранилище, здесь хранятся данные, которые содержит в себе БД
    dbFile = null;

    constructor(dbFile) {
        this.dbFile = dbFile;

        const dbDir = dirname(this.dbFile); //вытаскиваем из пути файла имя каталога (вместе со вложенностью)

        if (!existsSync(dbDir)) { //проверяем, есть ли такой каталог
            mkdirSync(dbDir, {recursive:true}); //рекурсивно создаем каталоги пути до файла
        }

        if (existsSync(this.dbFile)) { //проверяем, существует ли такой файл
            this.deserialize();
        } else {
            this.serialize();
        }
    }

    serialize () { // сериализация - когда данные в объекте базы данных поменялись, нужно их обновленные записать в файл, в котором хранится БД (скинуть на жесткий диск)
        const dbJSON = JSON.stringify(this.storage);
        writeFileSync(this.dbFile, dbJSON); //создаем файл и записываем в него данные
    }

    deserialize () { // десериализация - если файл существует, мы должны поместить данные из него в хранилище, иначе создать на основе пустого массива хранилища
        const dbJSON = readFileSync(this.dbFile);
        this.storage = JSON.parse(dbJSON);
    }

    getAll() {
        return this.storage;
    }

    create (payload) {
        if (!(payload.hasOwnProperty('name')
            &&payload.hasOwnProperty('author')
            &&payload.hasOwnProperty('description'))) {
            throw new Error ('DB: Create - Wrong payload');
        }

        let id = 0;
        if (!this.storage.length) {
            id++;
        } else {
            // let id = 1 + this.storage.length;
            id = 1 + Math.max(...this.storage.map((itm)=>itm.id));
        }

        throw new Error('Debug!!!!!!'); // удобно так выбрасывать ошибку при отладке. Код после этой строчки не будет продолжаться

        const found = this.storage.find((itm) => {
            return itm.id === id;
        }) // проверяем, есть ли уже в хранилище элемент с таким id, если есть, то выведем ошибку

        if (found) {
            throw new Error ('DB: CReate - Inconsistent database!');
        }

        const newItem = {
            id,
            name: payload.name,
            author: payload.author,
            description: payload.description
        };

        this.storage.push(newItem);

        this.serialize(); 

        return newItem;
    }

    update (id, payload) {
        if (!(payload.hasOwnProperty('name')
            ||payload.hasOwnProperty('author')
            ||payload.hasOwnProperty('description'))) {
            throw new Error ('DB: Update - Wrong payload');
        }

        const found = this.storage.find((itm) => {
            return itm.id === id;
        })

        if (!found) {
            throw new Error ('DB: Update - Item not found!');
        }

        const idx = this.storage.indexOf(found);

        const validKeys = ['name', 'author', 'description']; // массив нужен для проверки, чтобы в БД к объекту не прикреплять ключи, которых нет, если таковые придут в payload
        const keys = Object.keys(payload); // вытаскиваем все ключи, которые пришли в payload
    
        for (const key of keys) { // меняем поля в найденном элементе на новые
            if (validKeys.includes(key))
            {
                found[key] = payload[key];
            }
        }

        this.storage[idx] = found; // записываем обновленный объект в хранилище
        this.serialize(); // сохраняем обновленное хранилище в файл
    }

    getOne (id) {

        console.log('IN GETONE ID = ', id)
        const found = this.storage.find((itm) => {
            return itm.id === id;
        })

        console.log('FOUND = ', found);
        if (!found) {
            throw new Error ('DB: GetOne - Item not found!');
        }

        return found;
    }

    delete (id) {
        const found = this.storage.find((itm) => {
            return itm.id === id;
        }) // проверяем, есть ли уже в хранилище элемент с таким id, если есть, то выведем ошибку

        if (!found) {
            throw new Error ('DB: Delete - Item not found!');
        }

        const idx = this.storage.indexOf(found); // находим индекс элемента массива, который хотим удалить
        this.storage.splice(idx, 1); // удаляем один элемент массива, начиная с индекса idx
        this.serialize();
    }

    debug () {
        console.log('debug this.storage: ', this.storage);
     }
}