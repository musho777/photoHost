import { TouchableOpacity, View, Text, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { BackArrow, CheckMarkSvg } from '../assets/svg/Svgs';
import { Styles } from '../styles/Styles';

export const HeaderWhiteTitle = ({
  onPress,
  title,
  transparent,
  check,
  onCheck,
  loading,
  disabled
}) => {
  return (
    <SafeAreaView style={Styles.statusBar}>
      <View
        style={[
          Styles.flexAlignItems,
          { height: 50, paddingHorizontal: 10, backgroundColor: '#FFF' },
          transparent && { backgroundColor: 'transparent' },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={[Styles.darkSemiBold16, { marginHorizontal: 15 }]}>
          {title}
        </Text>
        {loading ? (
          <View style={{ position: 'absolute', right: 10 }}>
            <ActivityIndicator size="large" color={'#FFC24B'} />
          </View>
        ) : (
          <View style={{ position: 'absolute', right: 10 }}>
            {check && (
              <TouchableOpacity disabled={loading || disabled} onPress={onCheck}>
                <CheckMarkSvg />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
