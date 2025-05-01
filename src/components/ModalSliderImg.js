import { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    FlatList,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { AppColors } from '../styles/AppColors';

const windowWidth = Dimensions.get('window').width;
export const ModalSliderImg = ({ photo, activePhoto }) => {
    const [active, setActive] = useState(activePhoto || 0);
    const [height, setHeight] = useState(565)
    const handleMomentumScrollEnd = ({ index }) => {
        setActive(index);
    };

    return (
        <View style={{ height: height }}>
            <SwiperFlatList
                index={active}
                horizontal
                pagingEnabled
                data={photo}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                renderItem={({ item, index }) => {
                    if (item.height - 200 > item.width) {
                        if (active == index) {
                            setHeight(565)
                        }
                    }
                    else {
                        if (active == index) {
                            setHeight(330)
                        }
                    }
                    const imageUrl = `https://chambaonline.pro/uploads/${item.photo}`;
                    return (
                        <Image
                            style={[styles.img, { height: height }]}
                            source={{ uri: imageUrl }}
                        />
                    );
                }}
            />
            {photo.length > 1 && (
                <View style={styles.paginationWrapper}>
                    {photo.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.pagination,
                                i === active && { backgroundColor: AppColors.GoldenTainoi_Color },
                            ]}
                        />
                    ))}
                </View>
            )}
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
    },
});
