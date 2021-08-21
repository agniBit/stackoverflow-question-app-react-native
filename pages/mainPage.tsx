import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import axios, { AxiosRequestConfig } from 'axios';
import get_dummy_data from '../dummy_data';


export default function Dashboard(props:any) {
  const [questionData, setQuestionData] = useState(Array);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState('');
  const navigation = props.navigation;

  async function getQuestionData() {
    // const response = await axios.get(`https://api.stackexchange.com/2.3/search/advanced?pagesize=${limit}&order=desc&sort=relevance&q=${query}&site=stackoverflow`)
    // setQuestionData(response.data.items);
    setQuestionData(get_dummy_data().items);
  }

  const handleSearch = () => {
    Keyboard.dismiss();
    console.log(query);
  }

  const showQuestion = (questionData: any) => {
    console.log(questionData);
    navigation.navigate('ShowQuestionDetails', {questionData: questionData})
  }

  useEffect(() => {
    getQuestionData()
  }, []);

  return (
    <View style={styles.mainContainer} >
      {/* <AppStatusBar style={styles.statusBar} /> */}
      {/* <SafeAreaView style={styles.topSafeArea} /> */}
      <View style={styles.searchWrapper}>
        <TextInput style={styles.input} placeholder='Search' value={query} onChangeText={text => setQuery(text)}></TextInput>
        <TouchableOpacity onPress={handleSearch}>
          <View style={styles.searchBtnContainer}>
            <Text style={styles.searchBtn}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
            {questionData.map((question: any, index:number) => {
              return (
                <TouchableOpacity style={styles.questionContainer} key={index} onPress={() => showQuestion(question)}>
                  <View style={styles.questionDataRow}>
                    <Text>{question.reputation}</Text>
                    <Text>{question.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingVertical: '5%',
    paddingHorizontal: '7%'
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: '65%',
    borderRadius: 25,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  questionContainer: {
    width: '100%'
  },
  questionDataRow: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  searchBtnContainer : {},
  searchBtn : {},
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: '#000'
  }
});