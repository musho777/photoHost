import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { Skeleton } from '../Skeleton';
import { NotLineSvg, NotLineSvgWhite, ShearSvg } from '../../assets/svg/Svgs';
import { Comment, CommentWhite, ViewSvg, WhiteHeart, WhiteViewSvg } from '../../assets/svg/TabBarSvg';

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
          <View style={{ paddingHorizontal: 15, flexDirection: 'column', position: 'absolute', bottom: 30, right: 1, gap: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.hover}>
              <View style={styles.hoverItem}>
                <View style={{ marginTop: 1 }}>
                  <WhiteHeart />
                </View>
                <Text style={[Styles.balihaiRegular14, { color: 'white' }]}>0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.hover}>
              <View style={styles.hoverItem}>
                <View style={{ marginTop: 1 }}>
                  <CommentWhite />
                </View>
                <Text style={[Styles.balihaiRegular14, { color: 'white' }]}>0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.hover}>
              <View style={[styles.hoverItem, { justifyContent: 'center' }]}>
                <ShearSvg />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.hover}>
              <View style={styles.hoverItem}>
                <View style={{ marginTop: 1 }}>
                  <WhiteViewSvg />
                </View>
                <Text style={[Styles.balihaiRegular14, { color: 'white' }]}>0</Text>
              </View>
            </TouchableOpacity>

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
  hover: {
    marginRight: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
    height: 50,
    justifyContent: "space-around",
    flexDirection: 'column',
    alignItems: 'center'
  },
  bostBody: {
    paddingHorizontal: 5,
    marginBottom: 15,
    flexDirection: 'row',
    width: '100%'
  },
  hoverItem: {
    height: '100%',
    justifyContent: 'space-between',
    width: 20,
    alignItems: 'center'
  }
});
