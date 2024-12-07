import { StyleSheet, Text, View } from "react-native"
import { InReviewSvg } from "../assets/svg/Svgs"
import { Styles } from "../styles/Styles"

export const InReview = ({ height, borderRadius }) => {
  return <View style={[styles.inReview, { height: height, borderRadius: borderRadius }]}>
    <Text style={[Styles.darkSemiBold16, { color: 'white' }]}>В обзоре</Text>
    <InReviewSvg />
  </View>
}



const styles = StyleSheet.create({
  inReview: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
})