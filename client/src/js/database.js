import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the content to the database
    await store.add(content);

    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('putDb not implemented');
  }
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all content from the database
    const content = await store.getAll();

    console.log('Content retrieved from the database:', content);
    return content;
  } catch (error) {
    console.error('getDb not implemented');
    return [];
  }
}
initdb();
