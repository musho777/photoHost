import Navigation from "./src/navigation/Navigation"
import 'react-native-gesture-handler'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export default App = () =>{
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <Navigation />
    </GestureHandlerRootView>
}