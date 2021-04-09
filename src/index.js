import React from 'react';
import ReactDOM from 'react-dom';
import {getStore} from "./utils/storageUtils";
import {USER_KEY} from "./constant";
import memoryUtils from "./utils/memoryUtils";
import App from './App';

// 将store的数据保存至内存中
memoryUtils.user = getStore(USER_KEY)

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
