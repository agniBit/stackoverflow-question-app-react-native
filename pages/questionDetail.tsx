import React, { useState } from "react"
import { View, Text } from "react-native"

export default function ShowQuestionDetails(props: any) {
  const questionData = props.navigation.state.params.questionData;
  return (
    <View>
      <Text>{JSON.stringify(questionData)}</Text>
    </View>
  )
}