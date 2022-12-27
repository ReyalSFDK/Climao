import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text>Ola, sou um app</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
