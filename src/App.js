import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AddBI from './AddBI';
import ListBI from './ListBI';
import NoMatch from './NoMatch';

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <BrowserRouter>
        <h1>Book Information System</h1>
        <div>
        <button>
            <Link to="/">BI追加</Link>
          </button>
          <button>
            <Link to="/ListBI">BI一覧</Link>
          </button>
        </div>

        <Routes>
          <Route exact path="/" element={<AddBI />} />>
          <Route exact path="/ListBI" element={<ListBI />} />
          <Route exact path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;