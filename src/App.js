import React from 'react';
import './App.css';
import logo from './images/bridgitb-w.svg';
import { ItemSelection } from './ItemSelection.js'
import { ItemList } from './ItemList.js'

const App = () => (
  <>
    <header className="app-header">
      <img src={logo} alt="logo" />
      <div className="app-header-title">Bridgit - Frontend code challenge</div>
    </header>
    <section className="app-content">
      <ItemSelection/>
      <ItemList/>
    </section>
  </>
);

export default App;
