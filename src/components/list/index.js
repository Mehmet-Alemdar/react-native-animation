import { useState, useRef } from 'react'
import { SafeAreaView ,View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import Animated,{ Layout, ZoomInEasyUp, ZoomInRight, ZoomOutLeft } from 'react-native-reanimated'
import { Swipeable } from 'react-native-gesture-handler';

const ListCard = ({note, index, handleDelete, handleUpdate}) => {
    const renderRightActions = () => (
      <TouchableOpacity style={[styles.cardBox, styles.deleteButton]} onPress={() => handleDelete(index)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    )

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Animated.View 
          entering={ZoomInRight}
          exiting={ZoomOutLeft}
          layout={Layout.springify()}
          style={styles.cardBox}
          >
            <View style={{width: 10, height: 10, backgroundColor: 'black', borderRadius: 100}}></View>
            <Text>{note}</Text>
        </Animated.View>
      </Swipeable>

    )
}

const ListComponent = () => {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = () => {
    setList([...list, input])
    setInput('')
    inputRef.current.clear()
  }

  const handleDelete = (index) => {
    const newList = list.filter((item, i) => i !== index)
    setList(newList)
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={list}
        renderItem={({item, index}) => <ListCard note={item} index={index} handleDelete={handleDelete}/>}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listCardContainer}
      />
      <View style={styles.submitContainer}>
        <View style={styles.inputBox}>
          <TextInput 
            ref={inputRef} 
            placeholder='Enter your note' 
            onChangeText={(e) => setInput(e)}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  submitContainer: {
    flex: 1,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: "10%",
    justifyContent: 'space-between',
    gap: 4,
  },
  inputBox: {
    flex: 3,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  submitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  listCardContainer: {
    width: '90%',
    height: '85%',
  },
  cardBox: {
    width: '100%',
    height: 60,
    borderLeftWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: '#F3F3F3'
  },
  deleteButton: {
    width: '23%',
    backgroundColor: '#FF3E00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  updateButton: {
    width: '24%',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0,
  }
})

export default ListComponent