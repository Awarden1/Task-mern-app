import './App.css';
import { AuthProvider } from './store/store';
import Navigators from './Navigators';

function App() {
  return (
    <AuthProvider>
      <Navigators />
    </AuthProvider>
  );
}

export default App;
