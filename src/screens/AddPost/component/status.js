import { StyleSheet, Text, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { useEffect, useState } from 'react';
import { Styles } from '../../../styles/Styles';

export const Status = ({ error, setShowError, showError }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [showError]);

  if (showError)
    return <View style={{ position: 'absolute', left: 0, right: 0, top: 110 }}>
      <Shadow style={styles.blocks} startColor={'#00000010'}>
        <View style={styles.card}>
          <Text style={[Styles.whiteMedium12, { color: 'red' }]}>{error}</Text>
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