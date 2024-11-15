import { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ImageSourcePropType,
  FlatList,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import CategoryButton from "@/components/CategoryButton";
import EventCard from "@/components/EventCard";
import axios from "axios";

interface Category {
  ID: string;
  DESCRIPCION: string;
  ESTADO: string;
}
interface Event {
  ID: string;
  ID_TEVE: number;
  TITULO: string;
  UBICACION: string;
  DIRECCION: string;
  ENTGRATUITA: string;
  FINICIO: string;
  FFINAL: string;
  DESCRIPCION: string;
  IMAGEN: string;
  CONTACTO: string;
  NOCONTACTO: string;
  EMAILCONT: string;
  ESTADO: string;
  DESTACADO: number | null;
}

const backgroundImage: ImageSourcePropType = require("@/assets/images/background.jpg");

export default function Index(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [errorCategories, setErrorCategories] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [errorEvents, setErrorEvents] = useState<boolean>(false);
  const [eventsPage, setEventsPage] = useState<number>(1);
  const [eventsHasMore, setEventsHasMore] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await axios.get(
        "https://labsumincol.net/go2event/v1/list/teve",
        {
          headers: {
            Authorization: "3d524a53c110e4c22463b10ed32cef9d",
          },
        }
      );
      setCategories(response.data.tipo_eventos);
    } catch (error) {
      setErrorCategories(true);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const response = await axios.get(
        `https://labsumincol.net/go2event/v1/list/even?page=${eventsPage}&limit=7`,
        {
          headers: {
            Authorization: "3d524a53c110e4c22463b10ed32cef9d",
          },
        }
      );
      if (eventsPage === 1) {
        setEvents(response.data.tipo_eventos);
      } else {
        setEvents([...events, ...response.data.tipo_eventos]);
      }

      if (events.length >= response.data.pagination.total_records) {
        setEventsHasMore(false);
      } else {
        setEventsPage(eventsPage + 1);
      }
    } catch (error) {
      setErrorEvents(true);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Eventos en tu ciudad</Text>
            <CustomButton
              text="Añadir evento"
              onPress={() => console.log("Button pressed!")}
            />
          </View>

          <View style={styles.categoriesSection}>
            <Text style={[styles.sectionTitle, styles.sectionTitlePadding]}>
              Categorías
            </Text>
            {loadingCategories ? (
              <Text style={styles.categoriesLoadingText}>Cargando...</Text>
            ) : errorCategories ? (
              <View style={styles.categoriesError}>
                <CustomButton
                  text="Intentar de nuevo"
                  onPress={fetchCategories}
                  size="small"
                />
              </View>
            ) : (
              <FlatList
                data={categories}
                horizontal
                keyExtractor={(item) => item.ID}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryButton
                    onPress={() => console.log("Button pressed!", item.ID)}
                    text={item.DESCRIPCION}
                  ></CategoryButton>
                )}
                contentContainerStyle={styles.categoryListContainer}
                ListHeaderComponent={() => (
                  <View style={styles.categoryListLeftSide}></View>
                )}
                ListFooterComponent={() => (
                  <View style={styles.categoryListRightSide}></View>
                )}
              ></FlatList>
            )}
          </View>

          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Eventos destacados</Text>
            {events.length === 0 && loadingEvents ? (
              <View style={styles.eventsContent}>
                <Text style={styles.eventsLoadingText}>Cargando...</Text>
              </View>
            ) : errorEvents ? (
              <View style={styles.eventsContent}>
                <CustomButton
                  text="Intentar de nuevo"
                  onPress={fetchEvents}
                  size="small"
                />
              </View>
            ) : (
              <FlatList
                data={events}
                keyExtractor={(item) => item.ID}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <EventCard
                    title={item.TITULO}
                    date={item.FINICIO}
                    image={item.IMAGEN}
                    onPress={() => console.log("Event card pressed!", item.ID)}
                  ></EventCard>
                )}
                contentContainerStyle={styles.eventsListContainer}
                ListFooterComponent={() =>
                  events.length && loadingEvents ? (
                    <Text style={styles.eventsLoadingText}>Cargando...</Text>
                  ) : (
                    <View style={styles.eventsListBottom}></View>
                  )
                }
                onEndReached={() => {
                  if (eventsHasMore) {
                    fetchEvents();
                  }
                }}
                onEndReachedThreshold={0.5}
              ></FlatList>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    gap: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  categoriesSection: {
    marginHorizontal: -16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitlePadding: {
    paddingHorizontal: 16,
  },
  categoriesLoadingText: {
    width: "100%",
    paddingVertical: 8,
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  categoriesError: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoryListContainer: {
    gap: 10,
  },
  categoryListLeftSide: {
    width: 16,
    marginRight: -10,
  },
  categoryListRightSide: {
    width: 16,
    marginLeft: -10,
  },
  eventsSection: {
    flex: 1,
    marginBottom: -10,
    gap: 10,
  },
  eventsContent: {
    marginBottom: 16,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventsLoadingText: {
    fontSize: 14,
    color: "#fff",
  },
  eventsListContainer: {
    flexGrow: 1,
    gap: 12,
  },
  eventsListSeparator: {
    height: 12,
  },
  eventsListBottom: {
    marginTop: -12,
    height: 12,
  },
});
