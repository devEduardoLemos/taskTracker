import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import { Home } from "./pages/Home"
import { AddTask } from "./components/AddTask";

function App() {
  return (
    <Router>
      <div className="container">
        <Header
        // onAdd={() => setShowAddTask(!showAddTask)}
        // showAdd={showAddTask}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
