import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { CometChat } from '@cometchat-pro/chat';


const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(process.env.REACT_APP_COMETCHAT_REGION)
  .build();
CometChat.init(process.env.REACT_APP_COMETCHAT_APP_ID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');

    ReactDOM.render(
      <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  },
  (error) => {
    console.log('Initalization failed with error:', error);
  })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();