function App() {
  const name = "Stevens";
  const x = false;

  return (
    <div className="container">
      <h1>Hello from React</h1>
      <h2>Hi {x ? name : "Weirdo"}</h2>
    </div>
  );
}

export default App;
