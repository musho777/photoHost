import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AppColors } from '../../styles/AppColors';
import { Slider } from '../Slider';
import { PostHeader } from './postHeader/postHeader';
import { PostBody } from '../postBody';
import { ShowSave } from './showSave';

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
            star={data.user.star}
            setOpenModal={setOpenModal}
            deletData={deletData}
            addToblack={addToblack}
            activeImage={activeImage}
          />
        </View>
        {!data.background ? <Slider
          viewableItems={viewableItems}
          long={long}
          setActiveImage={(e) => setActiveImage(e)}
          onPressOut={() => onPressOut()}
          onLongClikc={() => onLongClikc()}
          photo={data.photo}
          setOpenModal={setOpenModal}
          setActivePhoto={(e) => setActivePhoto(e)}
          data={data}
          user={user}
        /> :
          <View style={{ marginBottom: 10 }}>
            {data.background == 1 &&

              <Image
                source={require('../../assets/img/fon1.png')}
                style={[{ height: 570 }, styles.img]}
              />
            }
            {data.background == 2 &&

              <Image
                source={require('../../assets/img/fon2.jpg')}
                style={[{ height: 570 }, styles.img]}
              />
            }

            {data.background == 3 &&

              <Image
                source={require('../../assets/img/fon3.jpg')}
                style={[{ height: 570 }, styles.img]}
              />
            }

            {data.background == 4 &&

              <Image
                source={require('../../assets/img/fon4.jpg')}
                style={[{ height: 570 }, styles.img]}
              />
            }

            {data.background == 5 &&

              <Image
                source={require('../../assets/img/fon5.jpg')}
                style={[{ height: 570 }, styles.img]}
              />
            }

            <View style={styles.textWrapper}>

              {data.font_size &&
                <Text style={{ color: data.color, fontFamily: data.font_family, fontSize: JSON.parse(data.font_size) }}>{JSON.parse(data.description)}</Text>
              }
            </View>
          </View>
        }
        {!long && <View style={styles.PostBody}>
          <PostBody
            postCount={user.postCount}
            commentCount={data.comment_count}
            setSelectidId={(id) => {
              setSelectedVidioId(data.photo[activePhoto])
              setSelectidId(id)
            }}
            liked={data.like_auth_user.findIndex((elm, i) => elm.user_id == user.data.id) >= 0}
            setShowView={(e) => setShowView(e)}
            setShowLike={(e) => setShowLike(e)}
            setShowShare={(e) => setShowShare(e)}
            view={data.view_count}
            my={user?.data.id != data.user.id ? false : true}
            userId={data.user.id}
            like={data.like_count}
            id={data.id}
            user={user}
            categoryId={data?.category?.id}
          />
        </View>}
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.data.id === nextProps.data.id
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
    position: "absolute",
    zIndex: 999,
    bottom: 10,
    width: '100%'
  }
});
