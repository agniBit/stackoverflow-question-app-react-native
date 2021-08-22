import axios from "axios";
import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import AnswerCard from "./components.tsx/answerCard";
import { getCache, setCache } from "./components.tsx/cache";
import notifyMessage from "./components.tsx/notifyUser";


export default function ShowQuestionDetails(props: any) {
  const questionData = props.navigation.state.params.questionData;
  const [answers, setAnswers] = useState(Array);
  const [limit, setLimit] = useState(10);

  async function fetchAnswerData() {
    try {
      const response = await axios.get(`https://api.stackexchange.com/2.3/questions/${questionData.question_id}/answers?pagesize=${limit}&order=desc&sort=activity&site=stackoverflow&filter=!6VvPDzQHbd2UL`);
      console.log(response.data);
      if (response.status == 200) {
        console.log('data fetched');
        setAnswers(response.data.items);
        setCache(questionData.question_id, response.data);
      } else {
        // check in cached data
        const data = await getCache(questionData.question_id);
        if (data) setAnswers(JSON.parse(data).items);
      }
    } catch {
      // if any other error happen try to fetch from cached data
      const data = await getCache(questionData.question_id);
      if (data) setAnswers(JSON.parse(data).items);
    }
  }

  const refreshList = () => {
    notifyMessage('Refreshing...');
    setLimit(limit + 10);
    fetchAnswerData();
  }

  const isCloseToBottom = (data: {layoutMeasurement:any, contentOffset:any, contentSize:any}) => {
    const paddingToBottom = 20;
    return data.layoutMeasurement.height + data.contentOffset.y >=
      data.contentSize.height - paddingToBottom;
  };

  useEffect(() => {
    fetchAnswerData();
  }, [questionData.question_id, setAnswers])

  return (
    <View style={styles.mainContainer}>
      <Text style={{paddingVertical:5, fontWeight: 'bold',}}>Question</Text>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={{ paddingVertical: 5, fontWeight: 'bold', }}>Answers</Text>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            refreshList();
          }
        }}
        scrollEventThrottle={400}
      >
        {
          answers?.map((answer: any, index) => {
            console.log(answer.body);
            return (
              <AnswerCard index={index} messageBody={answer.body} title={answer.title} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingVertical: 20,
    paddingHorizontal: '7%'
  },
  title: {
    backgroundColor: '#fff',
    fontSize: 20,
    padding: 13,
    borderRadius: 10,
  },
})