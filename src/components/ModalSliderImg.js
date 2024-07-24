import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Video from 'react-native-video';

const windowWidth = Dimensions.get('window').width;
export const ModalSliderImg = ({ photo, single, activePhoto }) => {

    const [active, setActive] = useState(0);
    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
            <StatusBar backgroundColor={"black"} barStyle="light-content" />
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
                    let aspectRatio = 1
                    if (item.width > item.height) {
                        aspectRatio = 0.2 + item.width / item.height
                    }
                    else {
                        aspectRatio = 0.2 + item.height / item.width
                    }
                    if (aspectRatio > 1) {
                        aspectRatio = 0.72
                    }
                    else if (aspectRatio < 1) {
                        aspectRatio = 0.72
                    }
                    return (
                        <View style={!single ? styles.img : { ...styles.img, width: windowWidth, height: 350 }}>
                            {!item.photo.includes('.mp4') ?

                                <Image
                                    style={[
                                        { marginVertical: 10, width: windowWidth, aspectRatio: aspectRatio ? aspectRatio : 1, borderRadius: 0 },
                                    ]}
                                    source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}

                                /> :
                                <Video

                                    style={[
                                        {
                                            width: windowWidth,
                                            // aspectRatio: aspectRatio - 1 ? aspectRatio : 1,
                                            zIndex: 999,
                                            opacity: 1,
                                            height: '50%'
                                            // height: '100%'
                                        },
                                    ]}
                                    controls={true}
                                    repeat={true}
                                    source={{ uri: `https://chambaonline.pro/uploads/${item.photo}` }}
                                    resizeMode={'cover'}
                                />
                            }

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
        height: 570,
        width: windowWidth,
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
