import React from 'react';
import styles from './App.styl';

const App = () => (

    <div className={styles.container}>
        <div>
            <div className={`${styles.buttonGroup} ${styles.top}`}>
                <button>1</button>
                <button>2</button>
            </div>
            <div className={`${styles.buttonGroup} ${styles.bottom}`}>
                <button>3</button>
                <button>4</button>
            </div>
        </div>
    </div>
);

export default App;