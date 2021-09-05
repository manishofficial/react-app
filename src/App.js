import React,{ useState } from 'react';
import EntryForm from "./components/Form";
import SearchForm from "./components/SearchForm";
import {Tabs, Tab} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [key, setKey] = useState('home');
  return (
    <div>
      <React.StrictMode>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <EntryForm/>
          </Tab>
          <Tab eventKey="search" title="Search">
            <SearchForm/>
          </Tab>
        </Tabs>
      </React.StrictMode>
    </div>
  );
}

export default App;
