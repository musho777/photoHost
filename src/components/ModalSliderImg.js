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

export const ModalSliderImg = ({ photo, activePhoto }) => {
    const [height1, setHeight] = useState(0)
    const getImageHeight = (imageUri) => {
        return new Promise((resolve, reject) => {
            Image.getSize(
                imageUri,
                (width, height) => {
                    console.log(height, 'height')
                    if (height > 600) {
                        resolve(height - 200); // Return the image height
                    }
                    else {
                        resolve(height); // Return the image height

                    }
                },
                (error) => {
                    reject(error); // Handle the error
                }
            );
        });
    };

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
                    let height = 700
                    if (item.height < 650) {
                        height = 400
                    }
                    else if (item.height && item.height >= 650) {
                        height = 700
                    }
                    else {
                        height = null
                        getImageHeight(`https://chambaonline.pro/uploads/${item.photo}`).then((r) => {
                            setHeight(r)
                        })
                    }
                    return (
                        <Image
                            style={[styles.img, { height: height ? height : height1 }]}
                            source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
                        />
                    );
                }}
            />
            <View
                style={styles.paginationWrapper}>
                {photo.length > 1 && photo?.map((elm, i) => (
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
