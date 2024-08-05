import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
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
  isLiked
}) => {

  const user = useSelector((st) => st.userData)
  const [openModal, setOpenModal] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [D, setD] = useState(description)

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
      <Shadow
        style={{ width: '100%', backgroundColor: '#fff', position: 'relative' }}
        startColor={'#00000010'}>
        <View style={styles.block}>
          <PostHeader
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
          />
          {description && <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
            <Text style={Styles.darkSemiBold12}>
              {D} {description?.length > 50 &&
                (showMore ?
                  <Text style={{ color: "#037ffc", fontSize: 13 }} onPress={() => setShowMore(false)}>Показать ещё</Text> :
                  <Text style={{ color: "#037ffc", fontSize: 13 }} onPress={() => setShowMore(true)}>Скрыть</Text>
                )
              }
            </Text>
          </View>}
          <Slider viewableItems={viewableItems} music={music} description={description} photo={photo} />
          <PostBody
            commentCount={commentCount}
            liked={isLiked >= 0}
            view={view}
            like={like}
            id={id}
          />
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    shadowColor: '#7E9DB5',
    borderColor: AppColors.White_Color,
    borderRadius: 10,
    position: 'relative',
  },
});
