import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Use react-router-dom
import { BrowserRouter as Router} from 'react-router-dom';

//Use Redux
import store from './store/store.js';
import { Provider } from 'react-redux';

// Use React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >

      <Provider store={store} >
        <Router>
          <App />
        </Router>
      </Provider>
      
      <ReactQueryDevtools isInitialOpen={false} position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
