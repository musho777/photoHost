import { Modal, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Input } from "../../../../ui/Input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { t } from '../../../../components/lang';
import { AppColors } from "../../../../styles/AppColors";

export const Position_professionModal = ({ visible, close, onPress }) => {
  const [search, setSearch] = useState('');
  const mainData = useSelector(st => st.mainData);
  const [profesions, setProfesins] = useState([])

  const constProfesions = [
    "3D-печать", "Авиастроение", "Автоматизация", "Автомобилестроение", "Агропромышленность", "Алмазная промышленность",
    "Аналитика данных", "Анестезиология", "Архитектура", "Аудиоинженерия", "Аэрокосмическая отрасль", "Банковское дело",
    "Биоинженерия", "Биотехнологии", "Блокчейн", "Бухгалтерия", "Ветеринария", "Вирусология", "Водоснабжение", "Водный транспорт",
    "Военное дело", "Гастроэнтерология", "Геммология", "Генетика", "Геодезия", "Геология", "Гидроэнергетика", "Гидротехника",
    "Гипербарическая медицина", "Гостиничный бизнес", "Гостеприимство", "Гражданское строительство", "Графический дизайн",
    "Группа психотерапия", "Дезинсекция", "Дерматология", "Дизайн", "Диетология", "Добыча полезных ископаемых", "Еда и напитки",
    "Экология", "Экспериментальная биофизика", "Экспериментальная медицина", "Электроника", "Электронная коммерция", "Энергетика",
    "Железнодорожный транспорт", "Здравоохранение", "Зеленая энергетика", "Инженерия", "Интернет вещей", "Информационная безопасность",
    "Искусственный интеллект", "Картография", "Кибербезопасность", "Киноиндустрия", "Клиническая диагностика", "Клиническая психология",
    "Когнитивная терапия", "Компьютерная томография", "Косметология", "Космическая отрасль", "Кулинария", "Лабораторная диагностика",
    "Лесное хозяйство", "Логистика", "Магнитно-резонансная томография", "Массажная терапия", "Машиностроение", "Медиа",
    "Медицина", "Международный бизнес", "Металлургия", "Микробиология", "Микроэлектроника", "Мобильные приложения",
    "Мода", "Музыкальная индустрия", "Нанотехнологии", "Нейрохирургия", "Нефтегазовая отрасль", "Облачные вычисления", "Образование",
    "Одежда и мода", "Онкология", "Организационное поведение", "Отоларингология", "Паразитология", "Патология", "Педиатрия",
    "Пластическая хирургия", "Полиграфия", "Повар", "Психиатрия", "Психоанализ", "Психология", "Психотерапия", "Работа с детьми",
    "Радио и телевидение", "Разработка игр", "Рекламные услуги", "Риэлторская деятельность", "Ритейл", "Робототехника",
    "Рыболовство", "Сельское хозяйство", "Стоматология", "Социальные сети", "Социальная работа", "Спортивная медицина",
    "Страхование", "Строительство", "Текстильная промышленность", "Телекоммуникации", "Травматология", "Транспорт",
    "Туризм", "Управление активами", "Управление персоналом", "Управление проектами", "Фармацевтика", "Финансовые технологии",
    "Финансы", "Фондовые рынки", "Фотограф", "Функциональная диагностика", "Химическая промышленность", "Энергетика",
    "Ювелирное дело", "Юриспруденция", "Шеф-повар"
  ];

  useEffect(() => {
    setProfesins(constProfesions)
  }, [])


  const SearcProfesions = (e) => {
    setSearch(e)
    let data = profesions.filter(elm => elm.toUpperCase().includes(e.toUpperCase()))
    setProfesins(data)
    if (e == '') {
      setProfesins(constProfesions)
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => close()}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              onChange={e => {
                SearcProfesions(e);
              }}
              value={search}
              placeholder={t(mainData.lang).search}
            />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={400}
            >
              <Text
                onPress={() => {
                  onPress("");
                  close();
                }}
                style={styles.modalText}>удалить</Text>
              {profesions.map((elm, i) => (
                <Text
                  key={i}
                  onPress={() => {
                    onPress(elm);
                    close();
                  }}
                  style={styles.modalText}>{elm}</Text>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: 300,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    color: AppColors.BaliHai_Color,
  },
  loadingMore: {
    paddingVertical: 10,
  },
});
