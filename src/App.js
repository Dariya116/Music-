import React from 'react';
import styles from './style.module.scss';
import AppRoutes from './routes/routes';

export default function App() {
  return (
    <div className={styles.wrapper}>
      <div className="App-layout">
        <AppRoutes />
      </div>
    </div>
  );
}

