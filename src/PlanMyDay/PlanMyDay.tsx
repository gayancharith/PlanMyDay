export const PlanMyDay = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Plan My Day</h1>
      <p style={{ textAlign: "center" }}>
        <a href="/" style={styles.link}>
          Back to Home
        </a>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    flexDirection: "column",
  },
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
