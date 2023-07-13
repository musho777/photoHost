import {Text, SafeAreaView} from 'react-native'
import { Notification } from "../assets/svg/TabBarSvg"
import { Styles } from '../styles/Styles'

export const HomeHeader = () =>{
    return <SafeAreaView style = {[Styles.flexSpaceBetween,{paddingHorizontal:10,paddingVertical:20}]}>
        <Text style = {Styles.homeTitle}>Chamba</Text>
        <Notification />
    </SafeAreaView>
}