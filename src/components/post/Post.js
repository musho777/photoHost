import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppColors } from '../../styles/AppColors';
import { Styles } from '../../styles/Styles';
import { Slider } from '../Slider';
import { PostHeader } from './postHeader';
import { PostBody } from '../postBody';
import { ShowSave } from './showSave';

export const Post = ({
  description,
  userInfo,
  like,
  viewableItems,
  commentCount,
  view,
  photo,
  id,
  star,
  addToblack,
  isBook,
  isFollow,
  deletData,
  data,
  music,
  isLiked,
  setSelectidId,
  setShowView
}) => {

  const user = useSelector((st) => st.userData)
  const [openModal, setOpenModal] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [D, setD] = useState(description)
  const { full } = useSelector((st) => st.fullScreen)


  const [saveType, setSaveType] = useState('Запись сохранена в закладках')


  useEffect(() => {
    CutText()
  }, [showMore])

  useEffect(() => {
    setD(description)
  }, [description])

  const CutText = () => {
    let t = ''
    if (showMore) {
      t = description?.substring(0, 50)
    }
    else {
      t = description
    }
    setD(t)
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setOpenModal(false)} >
      {showSave &&
        <ShowSave
          saveType={saveType}
        />
      }
      <View style={styles.block}>

        <View style={{ position: 'absolute', zIndex: 111, width: '100%' }}>
          {!full && <PostHeader
            userImg={userInfo.avatar}
            user={user}
            description={description}
            setShowSave={(e) => setShowSave(true)}
            userName={userInfo.name}
            setSaveType={(e) => setSaveType(e)}
            userId={userInfo.id}
            data={data}
            isFollow={isFollow}
            openModal={openModal}
            id={id}
            star={star}
            setOpenModal={setOpenModal}
            deletData={deletData}
            isBook={isBook}
            addToblack={addToblack}
          />}
          {description && <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
            <Text
              style={[Styles.whiteSemiBold12, styles.text]}>
              {D} {description?.length > 50 &&
                (showMore ?
                  <Text style={{ color: "#fff", fontSize: 13 }} onPress={() => setShowMore(false)}>Показать ещё</Text> :
                  <Text style={{ color: "#fff", fontSize: 13 }} onPress={() => setShowMore(true)}>Скрыть</Text>
                )
              }
            </Text>
          </View>}
        </View>
        <Slider viewableItems={viewableItems} music={music} description={description} photo={photo} />
        <View style={{ position: "absolute", zIndex: 999, bottom: 10, width: '100%' }}>
          {!full && <PostBody
            commentCount={commentCount}
            setSelectidId={(id) => setSelectidId(id)}
            liked={isLiked >= 0}
            setShowView={(e) => setShowView(e)}
            view={view}
            my={user?.data.id != userInfo.id ? false : true}
            userId={userInfo.id}
            like={like}
            id={id}
            user={user}
          />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
  text: {
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    paddingVertical: 3,
    width: 'auto',
    alignItems: 'center'
  }
});
