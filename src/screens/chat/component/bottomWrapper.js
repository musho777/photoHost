import { StyleSheet, TouchableOpacity, View } from "react-native";
import { InputComponent } from "./input";
import { Emojy, Sticker } from "../../../assets/svg/Svgs";
import EmojiPicker from "rn-emoji-keyboard";
import { forwardRef, useState } from "react";

export const BottomWrapper = forwardRef(({ addToblackList, setAddToBlackList, route }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sendMSg, setSendMsg] = useState('');

  const handlePick = (e) => {
    setSendMsg(sendMSg + e.emoji)
  }


  return <View style={[styles.input]}>
    <InputComponent sendMSg={sendMSg} setSendMsg={(e) => setSendMsg(e)} setAddToBlackList={(e) => setAddToBlackList(e)} addToblackList={addToblackList} route={route} />
    <View style={{ flexDirection: 'row', gap: 5 }}>
      <TouchableOpacity onPress={() => ref.current?.present()}>
        <Sticker />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Emojy />
      </TouchableOpacity>
    </View>
    <EmojiPicker onEmojiSelected={handlePick} open={isOpen} onClose={() => setIsOpen(false)} />
  </View>
})

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 60,
  }
})