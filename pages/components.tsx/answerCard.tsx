import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
var DomParser = require('react-native-html-parser').DOMParser


function getChild(vlaue: string, tag: string, key: string) {
  switch (tag) {
    case 'p': return <Text style={styles.p}>{vlaue}</Text>;
    case 'p a': return <Text style={styles.p_a}>{vlaue}</Text>;
    case 'p strong': return <Text style={styles.p_strong}>{vlaue}</Text>;
    case 'p code': return <Text style={styles.p_code}>{vlaue}</Text>;
    case 'pre code': return <ScrollView style={styles.pre}><Text style={styles.code}>{vlaue}</Text></ScrollView>;
    case 'hr': return <text></text>;
    default: null;
  }
}

export default function AnswerCard(data: { messageBody: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; index: number; }) {
  const document = new DomParser().parseFromString(data.messageBody, 'text/html');
  const rederChildren = [];
  for (let i = 0; i < document.childNodes.length; i++) {
    let child = document.childNodes[i];
    if ('tagName' in child) {
      let grandChild = child.childNodes;
      const siblings = [];
      console.log(grandChild)
      for (let k = 0; k < grandChild.length; k++) {
        if ('tagName' in grandChild[k]) {
          if (grandChild[k].childNodes.length != 0) {
            const c = getChild(grandChild[k].childNodes[0].nodeValue, child['tagName'] + ' ' + grandChild[k]['tagName'],'answerCard_'+data.index+'_'+i+'_'+k);
            if (c !== null) siblings.push(c);
          }
        } else {
          siblings.push(<Text key={'answerCard_'+data.index+'_'+i+'_'+k}>{grandChild[k].nodeValue}</Text>)
        }
      }
      rederChildren.push(<View key={'answerCard_' + data.index + '_' + i + '_'} style={{ flexDirection: 'row' , flexWrap:'wrap'}}>{siblings}</View>)
    } else {
      rederChildren.push(<Text key={'answerCard_'+data.index+'_'+i}>{child.nodeValue}</Text>)
    }
  }
  return <View key={'answerCard'+data.index} style={styles.answerCard}><Text style={styles.answerTitle}>{data.title}</Text>{rederChildren}</View>;
}


const styles = StyleSheet.create({
  answerCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  answerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  p: {},
  p_a: {
    color:'blue',
  },
  p_code: {
    color: 'white',
    backgroundColor:'#444444',
  },
  p_strong: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pre: {
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 10,
  },
  code: {
    width: '100%',
    color: 'white',
    overflow: 'scroll'
  },
})