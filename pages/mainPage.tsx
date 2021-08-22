import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, RefreshControl, Platform, ToastAndroid } from 'react-native';
import axios from 'axios';
import QuestionCard from './components.tsx/questionCard';
import { getCache, setCache } from './components.tsx/cache';


export default function Dashboard(props:any) {
  const [questionData, setQuestionData] = useState(Array);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState(''); // check when user click on search else fetch data from current query i.e. when fetch more data
  const navigation = props.navigation;

  async function getQuestionData() {
    if (currentQuery.trim()) {
      try {
        const response = await axios.get(`https://api.stackexchange.com/2.3/search/advanced?pagesize=${limit}&order=desc&sort=relevance&q=${encodeURI(currentQuery.trim())}&site=stackoverflow`)
        if (response.status == 200 && response.data) {
          setQuestionData(response.data.items);
          setCache(query, response.data);
        } else {
          // check in cached data
          const data = await getCache(query);
          if (data) setQuestionData(JSON.parse(data).items);
        }
      } catch {
        // if any other error happen try to fetch from cached data
        const data = await getCache(query);
        if (data) setQuestionData(JSON.parse(data).items);
      }
    }
  }

  function notifyMessage(msg: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      Alert.alert(msg);
    }
  }

  const handleSearch = () => {
    Keyboard.dismiss();
    setCurrentQuery(query);
    getQuestionData();
    notifyMessage('Searching :- ' + query);
  }

  const showQuestion = (questionData: any) => {
    navigation.navigate('ShowQuestionDetails', {questionData: questionData})
  }
  
  
  const refreshList = () => {
    notifyMessage('Refreshing...');
    setLimit(limit + 10);
    getQuestionData();
  }

  const isCloseToBottom = (data: {layoutMeasurement:any, contentOffset:any, contentSize:any}) => {
    const paddingToBottom = 20;
    return data.layoutMeasurement.height + data.contentOffset.y >=
      data.contentSize.height - paddingToBottom;
  };

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
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            refreshList();
          }
        }}
        scrollEventThrottle={400}
      >
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
    backgroundColor: '#25C03F',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});