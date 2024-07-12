import { StyleSheet, Text, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { SuccessSvg } from '../../assets/svg/Svgs';
import { Styles } from '../../styles/Styles';
import { useEffect } from 'react';

export const ShowSave = ({ showSave, saveType, setShowSave }) => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSave(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [showSave]);

  if (showSave)
    return <View style={{ position: 'absolute', left: 0, right: 0, top: 110 }}>
      <Shadow style={styles.blocks} startColor={'#00000010'}>
        <View style={styles.card}>
          <SuccessSvg />
          <Text style={Styles.whiteMedium12}>{saveType}</Text>
        </View>
      </Shadow>
    </View>
}

const styles = StyleSheet.create({
  blocks: {
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  card: {
    backgroundColor: '#3b3a3a',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    gap: 10,
  },
});