import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AddBI from './AddBI';
import ListBI from './ListBI';
import NoMatch from './NoMatch';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);


class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Authenticator>
        {({signOut, user }) => (
          <BrowserRouter>
            <h1>Book Information System</h1>
            <div>
            <button>
                <Link to="/">BI追加</Link>
              </button>
              <button>
                <Link to="/ListBI">BI一覧</Link>
              </button>
              <button onClick={signOut}>Sign out</button>
            </div>

            <Routes>
              <Route exact path="/" element={<AddBI />} />>
              <Route exact path="/ListBI" element={<ListBI />} />
              <Route exact path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        )}
      </Authenticator>
    );
  }
}

export default App;