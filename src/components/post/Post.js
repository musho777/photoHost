import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppColors } from '../../styles/AppColors';
import { Slider } from '../Slider';
import { PostHeader } from './postHeader/postHeader';
import { PostBody } from '../postBody';
import { ShowSave } from './showSave';
import { Styles } from '../../styles/Styles';

export const Post = React.memo(({
  viewableItems,
  addToblack,
  deletData,
  setSelectidId,
  setShowView,
  data,
  setShowLike,
  setShowShare,
  setSelectedVidioId,
  big = false
}) => {
  const user = useSelector((st) => st.userData)
  const [openModal, setOpenModal] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const [long, setLong] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const onLongClikc = () => {
    setLong(true)
  }
  const onPressOut = () => {
    setLong(false)
  }

  const fone = [
    require('../../assets/img/fon/1.jpg'),
    require('../../assets/img/fon/2.jpg'),
    require('../../assets/img/fon/3.jpg'),
    require('../../assets/img/fon/4.jpg'),
    require('../../assets/img/fon/5.jpg'),



    require('../../assets/img/fon/6.jpg'),
    require('../../assets/img/fon/10.jpg'),
    require('../../assets/img/fon/11.jpg'),
    require('../../assets/img/fon/12.jpg'),
    require('../../assets/img/fon/13.jpg'),
    require('../../assets/img/fon/14.jpg'),
    require('../../assets/img/fon/15.jpg'),
    require('../../assets/img/fon/20.jpg'),
    require('../../assets/img/fon/21.jpg'),
    require('../../assets/img/fon/23.webp'),
    require('../../assets/img/fon/24.webp'),
    require('../../assets/img/fon/26.webp'),
    require('../../assets/img/fon/27.webp'),
    require('../../assets/img/fon/30.webp'),
    require('../../assets/img/fon/35.jpeg'),
    require('../../assets/img/fon/36.jpeg'),
    require('../../assets/img/fon/37.jpeg'),
    require('../../assets/img/fon/38.jpeg'),
    require('../../assets/img/fon/39.jpeg'),
    require('../../assets/img/fon/40.jpeg'),
    require('../../assets/img/fon/41.jpeg'),
    require('../../assets/img/fon/42.jpeg'),
    require('../../assets/img/fon/43.jpeg'),
    require('../../assets/img/fon/44.jpeg'),
    require('../../assets/img/fon/45.jpeg'),
    require('../../assets/img/fon/46.jpeg'),
    require('../../assets/img/fon/47.jpeg'),
    require('../../assets/img/fon/48.jpeg'),
    require('../../assets/img/fon/49.jpeg'),
    require('../../assets/img/fon/50.jpeg'),
    require('../../assets/img/fon/51.jpeg'),
    require('../../assets/img/fon/52.jpeg'),
    require('../../assets/img/fon/53.jpeg'),
    require('../../assets/img/fon/54.jpeg'),
    require('../../assets/img/fon/55.jpeg'),
    require('../../assets/img/fon/56.jpeg'),
    require('../../assets/img/fon/57.jpeg'),
    require('../../assets/img/fon/58.jpeg'),
    require('../../assets/img/fon/59.jpeg'),
    require('../../assets/img/fon/60.jpeg'),
    require('../../assets/img/fon/61.jpeg'),
    require('../../assets/img/fon/62.jpeg'),
    require('../../assets/img/fon/63.jpeg'),
    require('../../assets/img/fon/64.jpeg'),
    require('../../assets/img/fon/65.jpeg'),
    require('../../assets/img/fon/66.jpeg'),
    require('../../assets/img/fon/67.jpeg'),
    require('../../assets/img/fon/68.jpeg'),
    require('../../assets/img/fon/69.jpeg'),
    require('../../assets/img/fon/70.jpeg'),
    require('../../assets/img/fon/71.jpeg'),
    require('../../assets/img/fon/72.jpeg'),
    require('../../assets/img/fon/73.jpeg'),
    require('../../assets/img/fon/74.jpeg'),
    require('../../assets/img/fon/75.jpeg'),
    require('../../assets/img/fon/76.jpeg'),
    require('../../assets/img/fon/77.jpeg'),
    require('../../assets/img/fon/78.jpeg'),
    require('../../assets/img/fon/80.jpeg'),
    require('../../assets/img/fon/81.jpeg'),
    require('../../assets/img/fon/82.jpeg'),
    require('../../assets/img/fon/83.jpeg'),
    require('../../assets/img/fon/84.jpeg'),
    require('../../assets/img/fon/86.jpeg'),
    require('../../assets/img/fon/87.jpeg'),
    require('../../assets/img/fon/88.jpeg'),
    require('../../assets/img/fon/89.jpeg'),
    require('../../assets/img/fon/90.jpeg'),
    require('../../assets/img/fon/91.jpeg'),
    require('../../assets/img/fon/92.jpeg'),
    require('../../assets/img/fon/93.jpeg'),
    require('../../assets/img/fon/94.jpeg'),
    require('../../assets/img/fon/95.jpeg'),
    require('../../assets/img/fon/96.jpeg'),
    require('../../assets/img/fon/97.jpeg'),
    require('../../assets/img/fon/98.jpeg'),
    require('../../assets/img/fon/99.jpeg'),
    require('../../assets/img/fon/100.jpeg'),



  ]

  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const Description = useMemo(() => {
    let desc = "";
    try {
      desc = JSON.parse(data?.description);
    } catch (error) {
      console.error('Failed to parse description:', error);
    }
    return desc;
  }, [data?.description]);


  return (
    <View>
      {showSave && <ShowSave saveType={saveType} />}
      <View style={styles.block}>
        <View style={{ position: 'absolute', zIndex: 111, width: '100%' }}>
          <PostHeader
            data={data}
            user={user}
            setShowSave={(e) => setShowSave(true)}
            setSaveType={(e) => setSaveType(e)}
            openModal={openModal}
            star={data?.user.star}
            setOpenModal={setOpenModal}
            deletData={deletData}
            addToblack={addToblack}
            activeImage={activeImage}
          />
        </View>
        {!data?.background ? <Slider
          viewableItems={viewableItems}
          long={long}
          setActiveImage={(e) => setActiveImage(e)}
          onPressOut={() => onPressOut()}
          onLongClikc={() => onLongClikc()}
          photo={data?.photo ? data?.photo : []}
          setOpenModal={setOpenModal}
          setActivePhoto={(e) => setActivePhoto(e)}
          data={data}
          user={user}
        /> :
          <View>

            <View style={{ marginBottom: 10 }}>
              <Image
                source={fone[data?.background - 1]}
                style={[{ height: 570 }, styles.img]}
              />
              <View style={styles.textWrapper}>
                {data?.font_size &&
                  <Text style={{ padding: 10, textAlign: 'center', color: data?.color, fontFamily: data?.font_family, fontSize: JSON.parse(data?.font_size) }}>{JSON.parse(data?.description)}</Text>
                }
              </View>
            </View>
          </View>
        }
        <View style={styles.PostBody}>
          <PostBody
            postCount={user.postCount}
            commentCount={data?.comment_count}
            setSelectidId={(id) => {
              setSelectedVidioId(data?.photo[activePhoto])
              setSelectidId(id)
            }}
            liked={data?.like_auth_user.findIndex((elm, i) => elm.user_id == user.data.id) >= 0}
            setShowView={(e) => setShowView(e)}
            setShowLike={(e) => setShowLike(e)}
            setShowShare={(e) => setShowShare(e)}
            view={data?.view_count}
            my={user?.data.id != data?.user.id ? false : true}
            userId={data?.user.id}
            like={data?.like_count}
            id={data?.id}
            user={user}
            categoryId={data?.category?.id}
          />
        </View>
        {(!data?.background && Description[activeImage]) &&
          <View style={{ marginBottom: 7, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {Description[activeImage] &&
              <View>
                <Text style={[Styles.darkMedium13, big && { color: 'white' }]}>
                  {isExpanded ? Description[activeImage] : `${Description[activeImage].slice(0, MAX_LENGTH)}`}
                </Text>
              </View>
            }
            {Description[activeImage] && Description[activeImage].length >= 31 && <TouchableOpacity onPress={toggleExpanded}>
              <Text style={[styles.showMoreText, big && { color: 'white' }]}>
                {isExpanded ? 'Показать меньше' : 'Показать больше'}
              </Text>
            </TouchableOpacity>}
          </View>
        }
      </View>
    </View >
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.data?.id === nextProps.data?.id
  )
});


const styles = StyleSheet.create({
  block: {
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  PostBody: {
    zIndex: 999,
    bottom: 40,
    width: '100%'
  }
});
