import { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { AppColors } from '../styles/AppColors';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export const ModalSliderImg = ({ photo, activePhoto }) => {

    const [active, setActive] = useState(0);
    return (
        <View>
            <StatusBar backgroundColor={"black"} barStyle="light-content" />
            <SwiperFlatList
                index={activePhoto}
                renderAll
                onChangeIndex={index => {
                    setActive(index.index);
                }}
                index0={active > 0 ? active - 1 : 0}
                data={photo}
                renderItem={({ item, index }) => {
                    let height = (windowWidth * item.height) / item.width
                    if (height < 400) {
                        height = 400;
                    }
                    else {
                        height = 700
                    }
                    return (
                        <Image
                            style={[styles.img, { height: height ? height : 500 }]}
                            source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}

                        />
                    );
                }}
            />
            <View
                style={styles.paginationWrapper}>
                {photo?.map((elm, i) => (
                    <View key={i}
                        style={[
                            styles.pagination,
                            i === active && { backgroundColor: AppColors.GoldenTainoi_Color }]}>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: windowWidth,
        flexShrink: 0,
    },
    pagination: {
        width: 6,
        height: 6,
        backgroundColor: '#CCD6DF',
        marginHorizontal: 5,
        borderRadius: 50,
    },
    paginationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    }
});
