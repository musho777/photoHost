import { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { AppColors } from '../styles/AppColors';
import SwiperFlatList from 'react-native-swiper-flatlist';

const windowWidth = Dimensions.get('window').width;
export const ModalSliderImg = ({ photo, single, activePhoto }) => {
    const [active, setActive] = useState(0);
    const [isZoomVisible, setZoomVisible] = useState(false);
    const closeZoom = () => {
        setZoomVisible(false);
    };
    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
            <SwiperFlatList
                index={activePhoto}
                // ref={swiperRef}
                renderAll
                onChangeIndex={index => {
                    setActive(index.index);
                }}
                index0={active > 0 ? active - 1 : 0}
                data={photo}
                renderItem={({ item, index }) => {
                    return (
                        <View style={!single ? styles.img : { ...styles.img, width: windowWidth, height: 350 }}>
                            <Image
                                style={[
                                    { marginVertical: 10, width: (windowWidth - 40), height: '100%', borderRadius: 20 },
                                ]}
                                // source={require('../assets/img/1.png')}
                                source={{ uri: `https://chamba.justcode.am/uploads/${item.photo}` }}
                                resizeMode={'cover'}
                            />

                        </View>
                    );
                }}
            />
            {/* <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                }}>
                {photo?.map((elm, i) => (
                    <View
                        key={i}
                        style={[
                            styles.pagination,
                            i === active && {
                                backgroundColor: AppColors.GoldenTainoi_Color,
                                borderRadius: 50,
                            },
                        ]}></View>
                ))}
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        height: 500,
        width: windowWidth - 20,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        width: 6,
        height: 6,
        backgroundColor: '#CCD6DF',
        marginHorizontal: 5,
        borderRadius: 50,
    },
});
