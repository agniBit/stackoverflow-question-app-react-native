import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import axios, { AxiosRequestConfig } from 'axios';
import get_dummy_data from '../dummy_data';
import QuestionCard from './components.tsx/questionCard';


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
    Alert.alert('Searching: ',query);
    getQuestionData();
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
                <QuestionCard question={question} index={index} showQuestion={showQuestion} />
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
    paddingVertical: 20,
    paddingHorizontal: '7%'
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginRight: 30,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 4,
    width: '65%',
    borderRadius: 25,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  searchBtnContainer: {
    alignItems: 'center',
  },
  searchBtn: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});