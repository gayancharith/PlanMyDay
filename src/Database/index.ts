import { openDB } from "idb";

const DB_NAME = "AGW_DB";
const STORE_NAME = "groceryList";
const DB_VERSION = 1;

export type typeGroceryItem = {
  value: string;
  id: number;
  status: "to-buy" | "bought";
};

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function saveData(data: any) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const id = await store.add(data);
  await tx.done;
  return id;
}

export async function getData(id: IDBKeyRange | IDBValidKey) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get(id);
}

export async function getAllData() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.getAll();
}

export async function deleteData(id: IDBKeyRange | IDBValidKey) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

const moveToBought = async (item: typeGroceryItem) => {
  await deleteData(item.id);
  const updatedItem = { ...item, status: "bought" };
  const id = await saveData(updatedItem);
  return id;
};

const moveToToBuy = async (item: typeGroceryItem) => {
  await deleteData(item.id);
  const updatedItem = { ...item, status: "to-buy" };
  const id = await saveData(updatedItem);
  return id;
};

export {};
