import './app.scss';
import util from './util';
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {RootStore} from './store/index'
import action from './store/action';
function App() {
  const dispatch = useDispatch();
  const chatStore = useSelector(store => (store as RootStore).chatStore);

  function loadMessage() {
    let fetchData = async () => {
      return await util.getMessage()
    }
    fetchData().then(result => {
      dispatch(action.chatAction.setChats(result))
    })
  }

  useEffect(() => {
    // dispatch(action.chatAction.setChats(util.getMessage()))
    loadMessage();
  }, [chatStore.data])
  
  const [refesh, setRefesh] = useState(1);
  
  useEffect(() => {
    loadMessage();
    setTimeout(() => {
      setRefesh(refesh + 1);
    }, 5000)
  }, [refesh])
  return (
    <div className="App">
        <h1>App Chat Discord With Redux Toolkit - Kênh module 1 - react</h1>
        <div id='chat_list_view'>
          <div id='chat_list_view_content'>
            {
              chatStore.data.slice().reverse().map(message => (
                <p key={Date.now() * Math.random()}>
                  <img src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=80`}/>
                  {message.author.username}: {message.content} : {message.timestamp}
                  </p>
              ))
            }
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            util.sendMessage((e.target as HTMLFormElement).content.value)
            setTimeout(() => {
              loadMessage();
            }, 1000)
          }} id='chat_arena'>
            <input name='content' type="text" />
            <button type='submit'>Send</button>
          </form>
        </div>
    </div>
  );
}

export default App;
