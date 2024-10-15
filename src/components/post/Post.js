import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
}) => {

  const user = useSelector((st) => st.userData)
  const [openModal, setOpenModal] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [saveType, setSaveType] = useState('Запись сохранена в закладках')
  const [long, setLong] = useState(false)

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
        <Slider
          viewableItems={viewableItems}
          long={long}
          setActiveImage={(e) => setActiveImage(e)}
          onPressOut={() => onPressOut()}
          onLongClikc={() => onLongClikc()}
          photo={data.photo}
          setOpenModal={setOpenModal}
          data={data}
          user={user}
        />
        {!long && <View style={{ position: "absolute", zIndex: 999, bottom: 10, width: '100%' }}>
          <PostBody
            postCount={user.postCount}
            commentCount={data.comment_count}
            setSelectidId={(id) => setSelectidId(id)}
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
});
