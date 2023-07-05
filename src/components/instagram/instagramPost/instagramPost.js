import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { REACT_APP_PEXELS_API_KEY, REACT_APP_PEXELS_API_URL } from '@env';
import { faker } from '@faker-js/faker';
import { MaterialCommunityIcons, FontAwesome5, Feather, Octicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');

const DotComponent = ({postLength, activeIndex}) => {
  return (
    <View style={{flexDirection: 'row', gap: 4}}>
      {[...Array(postLength)].map((_, index)=> {
        return (
          <View 
            key={index}
            style={[{width: 8, height: 8, borderRadius: 10}, index === activeIndex ? {backgroundColor: '#009BDE'}: {backgroundColor: '#D7D7D7'}]} />
        )
      })}
    </View>
  )
}

const InstagramPost = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({avatar: '', name: ''});
  const [imageIndex, setImageIndex] = useState(1);


  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetch(REACT_APP_PEXELS_API_URL, {
        headers: {
          'Authorization': REACT_APP_PEXELS_API_KEY
        }
      })
      const { photos } = await data.json();
      setImages(photos);
    };

    fetchImages();
    setUser(prevUser => ({
      ...prevUser,
      avatar: faker.image.avatar(),
      name: faker.person.firstName("female")
    }))
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <LinearGradient 
        colors={['#EB6E00','#EB0092']} 
        start={{x:0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.userImageContainer}>
          <Image source={{uri: user.avatar}} resizeMode='cover' style={styles.userImage} />
        </LinearGradient>
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <View style={{height: 262}}>
        <View style={styles.imageCountContainer}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{imageIndex + 1}/{images.length}</Text>
        </View>
        <FlatList 
          data={images}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={ev => {
            setImageIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
          }}
          renderItem={({item}) => {
            return (
              <View style={{ width, height: '100%' }}>
                <Image
                  source={{uri: item.src.medium}}
                  style={styles.postImage}
                />
              </View>
            )
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.actionContainer}>
          <MaterialCommunityIcons name="cards-heart-outline" size={28} color="white" />
          <FontAwesome5 name="comment" size={26} color="white" />
          <Feather name="send" size={22} color="white" />
        </View>
        <DotComponent postLength={images.length} activeIndex={imageIndex} style={{backgroundColor: 'blue'}} />
        <View style={styles.bookmarkContainer}>
          <Octicons name="bookmark" size={26} color="white" style={{ marginLeft: 'auto'}} />
        </View>
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.5,
  },
  userInfoContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    padding: 10,
  },
  userImageContainer: {
    width: 45, 
    height: 45,
    backgroundColor: 'yellow', 
    borderRadius: 50, 
    padding: 2
  },
  userImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 50, 
    borderWidth: 3
  },
  userName: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: height * 0.02
  },
  postImage: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover'
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    alignItems: 'center'
  },
  imageCountContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)', 
    position: 'absolute', 
    width: 40, 
    height: 25, 
    zIndex: 1, 
    right: 0, 
    margin: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  bookmarkContainer: {
    flex: 1,
  }
})

export default InstagramPost;