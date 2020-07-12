import { openDB, deleteDB } from 'idb';

const DB = {
    NAME: process.env.REACT_APP_DB_NAME,
    VERSION: process.env.REACT_APP_DB_VERSION,
    STORE: process.env.REACT_APP_OBJECT_STORE
}

export async function getLocations() {
    ('worked')

    const db = await openDB(DB.NAME, DB.VERSION, {
        upgrade(database, oldVersion, newVersion, transaction) {
            const store = database.createObjectStore(DB.STORE, {
                keyPath: 'location'
            });
            store.createIndex('location', 'location');
        }
    })
    
    const results = await db.getAllFromIndex(DB.STORE, 'location')

    db.close();
    return results;
}

export async function deleteLocation(location) {
    const db = await openDB(DB.NAME, DB.VERSION);
    const results = await db.delete(DB.STORE, location);
    db.close();
    return results;
}

export async function addLocation(reqObj) {
    const db = await openDB(DB.NAME, DB.VERSION, {
        upgrade(database, oldVersion, newVersion, transaction) {
            ('upgrade')
            database.deleteObjectStore(DB.STORE)
            const store = database.createObjectStore(DB.STORE, {
                keyPath: 'location'
            });
            store.createIndex('location', 'location');
        }
    });

    const locationExists = await db.count(DB.STORE, reqObj.location)
    if (!locationExists) {
        await db.add(DB.STORE, reqObj);
    }
    else {
        alert('Location exists')
    }
    db.close();
}

export async function getLocationDetail(location) {
    const db = await openDB(DB.NAME, DB.VERSION)
    const result = await db.getFromIndex(DB.STORE, 'location', location)
    db.close()
    return result;
}

export async function editLocation(reqObj) {
    const db = await openDB(DB.NAME, DB.VERSION)
    const tx = db.transaction(DB.STORE, 'readwrite')
    const store = tx.objectStore(DB.STORE)
    const index = store.index('location');
    const cursor = await index.openCursor(reqObj.location);
    if (cursor) {
        const value = {
            ...cursor.value,
            ...reqObj
        }
        await cursor.update(value)
    }
    await tx.done;

    // for await (const cursor of index.iterate('home')) {
    //     ('worked')
    //   const article = { ...cursor.value };
    //   article.body += ' And, happy new year!';
    //   cursor.update(article);
    // }
    // const value = {
    //     location: reqObj,
    //     address: 'Testing',
    //     phone: '1234567890'
    // }
    // (await store.put(value, 'locations'))
    // await tx.done
    // const val = await db.getFromIndex(DB.STORE, 'location', reqObj)
    // const value = {
    //     ...val,
    //     address: 'Testing',
    //     phone: '1234567890'
    // }
    // const request = await store.put(value, reqObj)
    // request.onsuccess = function(e){
    //     ('success ', e)
    // }
    // request.onerror = function(e){
    //     ('error ', e)
    // }
    db.close();
    return
}