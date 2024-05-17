import { useEffect } from 'react';
import './App.css';
import { fetchUser } from './api/fetchUser';
import { handleToken } from './api/handleToken';

function App() {

  useEffect(() => {
    fetchUser();
    handleToken();
  }, []);
  
  return (
    <div className="App">
      Доп соглашение
    </div>
  );
}

export default App;
