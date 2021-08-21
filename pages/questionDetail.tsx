import axios from "axios";
import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import getDummyAnswerData from "../dummy_answer_data";
import AnswerCard from "./components.tsx/answerCard";


export default function ShowQuestionDetails(props: any) {
  const questionData = props.navigation.state.params.questionData;
  const [answers, setAnswers] = useState(Array);

  const fetchAnswerData = async () => {
    // const response = await axios.get(`https://api.stackexchange.com/2.3/questions/${props.question_id}/answers?pagesize=10&order=desc&sort=activity&site=stackoverflow&filter=!6VvPDzQHbctIY`);
    // setAnswers(response.data.items);
    setAnswers(await getDummyAnswerData().items);
    console.log(answers);
  }

  useEffect(() => {
    fetchAnswerData();
  }, [props.question_id, setAnswers])

  return (
    <View style={styles.mainContainer}>
      <Text style={{paddingVertical:5, fontWeight: 'bold',}}>Question</Text>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={{ paddingVertical: 5, fontWeight: 'bold', }}>Answers</Text>
      <ScrollView>
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