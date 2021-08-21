import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function QuestionCard(props: any) {
  
  function timeConverter(UNIX_timestamp: number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + year;
    return time;
  }

  return (
    <TouchableOpacity style={styles.questionContainer} key={'QuestionCard_'+props.index} onPress={() => props.showQuestion(props.question)}>
      <View style={styles.questionDataRow}>
        <Text style={styles.title}>{props.question.title}</Text>
        <View style={styles.tags}>
          {
            props.question.tags.map((tag: string, index:number) => {
              return <Text key={"QuestionCard_tags_"+index} style={styles.tagText}>{tag}</Text>
            })
          }
        </View>
        <View style={styles.footer}>
          <Text style={{ fontSize: 12 }}>{`up-votes : ${props.question.score}  `}</Text>
          <Text style={{ fontSize: 12 }}>{'Asked by : '}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{props.question.owner.display_name}</Text>
          <Text style={{ fontSize: 12, fontStyle:'italic' }}>{'  '+timeConverter(props.question.creation_date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 7,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tagText: {
    backgroundColor: '#c0c0c0',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 7,
  },
});