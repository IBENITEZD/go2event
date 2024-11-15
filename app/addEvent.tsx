import { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";

export default function AddEvent(): JSX.Element {
  const [form, setForm] = useState({
    title: "",
    location: "",
    address: "",
    freeEntry: false,
    startDate: "",
    endDate: "",
    description: "",
    image: "",
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    state: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Agregar nuevo evento</Text>

        <ScrollView contentContainerStyle={styles.form}>
          <FormInput
            label="Título"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholder="Título"
          />
          <FormInput
            label="Ubicación"
            value={form.location}
            onChangeText={(text) => handleChange("location", text)}
            placeholder="Ubicación"
          />
          <FormInput
            label="Dirección"
            value={form.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder="Dirección"
          />
          <FormInput
            label="Fecha de inicio"
            value={form.startDate}
            onChangeText={(text) => handleChange("startDate", text)}
            placeholder="Fecha de inicio"
          />
          <FormInput
            label="Fecha de finalización"
            value={form.endDate}
            onChangeText={(text) => handleChange("endDate", text)}
            placeholder="Fecha de finalización"
          />
          <FormInput
            label="Descripción"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Descripción"
          />
          <FormInput
            label="Imagen"
            value={form.image}
            onChangeText={(text) => handleChange("image", text)}
            placeholder="URL de la imagen"
          />
          <FormInput
            label="Nombre de contacto"
            value={form.contactName}
            onChangeText={(text) => handleChange("contactName", text)}
            placeholder="Nombre de contacto"
          />
          <FormInput
            label="Número de contacto"
            value={form.contactNumber}
            onChangeText={(text) => handleChange("contactNumber", text)}
            placeholder="Número de contacto"
          />
          <FormInput
            label="Email de contacto"
            value={form.contactEmail}
            onChangeText={(text) => handleChange("contactEmail", text)}
            placeholder="Email de contacto"
          />
          <FormInput
            label="Estado"
            value={form.state}
            onChangeText={(text) => handleChange("state", text)}
            placeholder="Estado"
          />

          <CustomButton
            text="Agregar evento"
            onPress={() => console.log(form)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "#073B4C",
    padding: 16,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    display: "flex",
    gap: 10,
  },
});
