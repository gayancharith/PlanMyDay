import { useEffect, useState } from "react";
import { deleteData, getAllData, saveData, typeGroceryItem } from "../Database";

export const GroceryList = () => {
  const [item, setItem] = useState("");
  // const [itemsToBuy, setItemsToBuy] = useState<TItem[]>([]);
  // const [storedData, setStoredData] = useState<TItem[]>([]);

  const [toBuyItems, setToBuyItems] = useState<typeGroceryItem[]>([]);
  const [boughtItems, setBoughtItems] = useState<typeGroceryItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const allItems = await getAllData();
    const toBuy = allItems.filter((item) => item.status === "to-buy");
    const bought = allItems.filter((item) => item.status === "bought");
    setToBuyItems(toBuy);
    setBoughtItems(bought);
  };

  // const fetchStoredData = async () => {
  //   const allData = await getAllData();
  //   setStoredData(allData);
  // };

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();
    const inputValue = e.target.item.value;
    const createdId = await saveData({ value: inputValue, status: "to-buy" });
    setToBuyItems([
      ...toBuyItems,
      { id: createdId as number, value: inputValue, status: "to-buy" },
    ]);
    setItem("");
  };

  const moveToBought = async (item: typeGroceryItem) => {
    await deleteData(item.id);
    const updatedItem = { ...item, status: "bought" };
    await saveData(updatedItem);
    fetchItems();
  };

  const moveToToBuy = async (item: typeGroceryItem) => {
    await deleteData(item.id);
    const updatedItem = { ...item, status: "to-buy" };
    await saveData(updatedItem);
    fetchItems();
  };

  const removeItem = async (id: number) => {
    await deleteData(id);
    fetchItems();
  };

  console.log({ toBuyItems });

  return (
    <div style={{ marginLeft: "20px" }}>
      <h1>Grocery List</h1>
      <p>
        <a href="/" style={styles.link}>
          Back to Home
        </a>
      </p>
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="item"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <br />

        {/* To Buy Section */}
        <h3>To Buy</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {toBuyItems.map(({ value, id, status }) => {
            if (status === "to-buy") {
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "3px",
                  }}
                >
                  <input
                    style={{ cursor: "inherit" }}
                    type="checkbox"
                    id={`item${id}`}
                    name={value}
                    value={item}
                    onChange={(e) => moveToBought({ value, id, status })}
                  />
                  <label
                    style={{
                      cursor: "inherit",
                      marginLeft: "2px",
                    }}
                    htmlFor={`item${id}`}
                  >
                    {value}
                  </label>
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => removeItem(id)}
                  >
                    X
                  </button>
                </div>
              );
            }
          })}
        </div>
        <br></br>

        {/* Already bought Section */}
        <h3>Bought</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {boughtItems.map(({ value, id, status }) => {
            if (status === "bought") {
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "3px",
                  }}
                >
                  <input
                    style={{ cursor: "inherit" }}
                    type="checkbox"
                    id={`item${id}`}
                    name={value}
                    value={item}
                    checked
                    onChange={(e) => moveToToBuy({ value, id, status })}
                  />
                  <label style={{ cursor: "inherit" }} htmlFor={`item${id}`}>
                    {value}
                  </label>
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => removeItem(id)}
                  >
                    X
                  </button>
                </div>
              );
            }
          })}
        </div>
        <br></br>
      </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: "2em",
    marginBottom: "1.5em",
  },
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "1.2em",
  },
};
