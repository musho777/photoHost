import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { Skeleton } from '../Skeleton';
import { NotLineSvg } from '../../assets/svg/Svgs';
import { Comment, ViewSvg } from '../../assets/svg/TabBarSvg';

export const PostLoading = () => {

  return (
    <View >
      <Shadow
        style={{ width: '100%', backgroundColor: '#fff', position: 'relative' }}
        startColor={'#00000010'}>
        <View style={styles.block}>
          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Skeleton
              width={35}
              height={35}
              style={{ borderRadius: 50 }}
            />
            <View style={{ gap: 5 }}>
              <Skeleton width={200} height={10} />
              <Skeleton width={100} height={7} />
            </View>
          </View>
          <Skeleton
            width={'100%'}
            height={550}
          />
          <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={[Styles.flexAlignItems, { marginRight: 20 }]}>
                <NotLineSvg />
              </View>
              <View style={[Styles.flexAlignItems,]}>
                <Comment />
              </View>
            </View>
            <View style={[Styles.flexAlignItems]}>
              <ViewSvg />
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
});
