import React, { Suspense } from 'react';
import { Store, useStore }from './store';
import Discovery from './components/Discovery/Discovery';
import Loading from './components/Generic/Loading';
import Header from './components/Generic/Header';
import Filter from './components/Generic/Filter';
import './App.scss';

function App() {
  const { state } = useStore();
  console.log(state);
  return (
    <Store>
      <div className="page">
        <Header />
        <Filter />
        <Suspense fallback={Loading}>
          <Discovery />
        </Suspense>
      </div>
    </Store>
  );
}

export default App;
