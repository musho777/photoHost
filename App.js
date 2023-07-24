import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/configStore';

export default App = () => {
  const Pushers = async () => {
    const pusher = Pusher.getInstance();
    await pusher.init({
      apiKey: 'e0a82fc848e8facbc238',
      cluster: 'ap2',
    });
    await pusher.connect();
    await pusher.subscribe({
      channelName: 'NewMessage',
      onEvent: event => {
        console.log(event.data.message?.receiver_id);
        // dispatch(AddMsgAction({
        //   message: event.data.message.message,
        //   receiver_id: event.data.message.receiver_id,
        // }))
      },
    });
  };
  // useEfe
  return (
    <Provider store={store}>
      
      <GestureHandlerRootView style={{flex: 1}}>
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
};
