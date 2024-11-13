import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';

export const AddImageLoading = ({ uri }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.02;
        if (newProgress >= 0.9) { // Stop at 90%
          clearInterval(interval);
          return 0.9;
        }
        return newProgress;
      });
    }, 5); // 10 ms interval for a smooth animation over 1 second

    return () => clearInterval(interval);
  }, []);
  return <SafeAreaView style={styles.wrapper}>
    <View style={styles.loadingVidio}>
      {uri && <Image source={{ uri: uri }} style={styles.image} />}
      {/* <Text style={Styles.homeTitle}>Загрузка</Text> */}
      <Progress.Pie color='#fbd433' progress={progress} width={40} />
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  loadingVidio: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingRight: 15,
    height: 60,
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  loading: {
    width: 66,
    height: 50,
    marginLeft: -25,
    marginBottom: -3
  },
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    zIndex: 999
  }
})
