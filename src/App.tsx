import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store';
import { RootState } from './app/store';
import { increment, decrement, reset, incrementAsync } from './features/counter/counterSlice';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.counter.status);
  const [amount, setAmount] = useState(1);
  

  return (
    <div className="App">
       <h1>Counter: {count}</h1>
       <button onClick={() => dispatch(increment())}>+</button>
       <button onClick={() => dispatch(decrement())}>-</button>
       <button onClick={() => dispatch(reset())}>Reset</button>

       <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          onClick={() => dispatch(incrementAsync(amount))}
          disabled={status === 'loading'}
          >
          Async Increment
        </button>
       </div>
    </div>
  );
}

export default App;
