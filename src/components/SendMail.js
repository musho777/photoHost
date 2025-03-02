import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Image, ActivityIndicator, Alert, Keyboard } from "react-native";
// import { pick } from "@react-native-documents/picker";
import { useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import { CloseSvg, CloseSvg1, Success } from "../assets/svg/Svgs";


export const SendMail = ({ visible, onClose }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [succass, setSuccass] = useState(false)
  const staticdata = useSelector(st => st.static);
  const selectFile = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      setFile(result.assets[0]);
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };
  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("comment", comment);
    if (file)
      formData.append("file", {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });
    try {
      const response = await fetch("https://chambaonline.pro/api/new_function_idea", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${staticdata.token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Ответ сервера:", result);
      // Сброс полей после успешной загрузки
      setFile(null);
      setComment("");
      setSuccass(true)
      // onClose();
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      Alert.alert("Ошибка", "Не удалось загрузить файл.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">

      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        {!succass ? <View style={{ width: 300, backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>Выберите файл и оставьте комментарий</Text>

          <TouchableOpacity onPress={selectFile} style={{ padding: 10, backgroundColor: "#007bff", borderRadius: 5, marginBottom: 10 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>{file ? "Выбрать другой файл" : "Выбрать файл"}</Text>
          </TouchableOpacity>

          {file && (
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              {file.type.includes("image") ? (
                <Image source={{ uri: file.uri }} style={{ width: 100, height: 100, marginBottom: 5 }} />
              ) : (
                <Text>{file.name}</Text>
              )}
            </View>
          )}

          <TextInput
            placeholder="Предложить мысль"
            value={comment}
            onChangeText={setComment}
            multiline
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 }}
          />

          {/* Кнопка загрузки */}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <Button title="Oтправить" onPress={uploadFile} />
          )}

          {/* Кнопка закрытия */}
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10, position: 'absolute', right: 0 }}>
            <TouchableOpacity onPress={() => {
              setSuccass(false)
              onClose()
            }} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseSvg1 />
            </TouchableOpacity>
          </TouchableOpacity>
        </View> :
          <View style={{ width: 300, backgroundColor: "#fff", padding: 20, borderRadius: 10, height: 180, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              setSuccass(false)
              onClose()
            }} style={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseSvg1 />
            </TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>Выше сообщение отправлено.</Text>
            <Success />
          </View>
        }
      </TouchableOpacity>
    </Modal>
  );
};
