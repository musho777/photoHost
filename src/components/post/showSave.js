import { Image, StyleSheet, Text, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { AppColors } from '../../styles/AppColors';

export const ShowSave = ({
  saveType
}) => {
  return <View style={styles.blocks}>
    <Shadow
      style={[{ width: '100%', borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: "center", height: 50 }]}
      startColor={'#00000010'}
    >
      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', gap: 10, paddingHorizontal: 2 }}>
          <Image source={require('../../assets/img/icons8-save-30.png')} />
          <Text style={styles.heading}>{saveType}</Text>
        </View>
      </View>
    </Shadow>
  </View>
}

const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
  blocks: {
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});