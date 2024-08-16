export const Home = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Home Page</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={styles.linkContainer}>
          <a href="/plan-my-day" style={styles.link}>
            Plan My Day
          </a>
        </div>

        <div style={styles.linkContainer}>
          <a href="/grocery-list" style={styles.link}>
            Grocery List
          </a>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "2em",
    marginBottom: "1.5em",
    textAlign: "center",
  },
  linkContainer: {
    margin: "10px 0",
  },
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "1.2em",
  },
};

export default Home;
