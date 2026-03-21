const DB_NAME = 'raasiii-images';
const DB_VERSION = 1;
const STORE = 'images';

export const IDB_IMAGE_PREFIX = 'idb:';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('indexedDB is not available'));
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
    });
  }

  return dbPromise;
}

export function isIndexedDbImageRef(src: string) {
  return src.startsWith(IDB_IMAGE_PREFIX);
}

export function toIndexedDbImageRef(id: string) {
  return `${IDB_IMAGE_PREFIX}${id}`;
}

export function parseIndexedDbImageId(ref: string) {
  return ref.slice(IDB_IMAGE_PREFIX.length);
}

export function putImageBlob(id: string, blob: Blob): Promise<void> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(STORE).put(blob, id);
      })
  );
}

export function getImageBlob(id: string): Promise<Blob | null> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).get(id);
        req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
        req.onerror = () => reject(req.error);
      })
  );
}

export function deleteImageBlob(id: string): Promise<void> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.objectStore(STORE).delete(id);
      })
  );
}

export function deleteImageIfStored(ref: string): Promise<void> {
  if (!isIndexedDbImageRef(ref)) {
    return Promise.resolve();
  }

  return deleteImageBlob(parseIndexedDbImageId(ref));
}
