
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

import {QueryClient, QueryClientProvider, useQuery } from 'react-query';

 function App() {

    const apiBase = 'https://api.themoviedb.org/3/discover/tv?with_network=213&language=pt-BR&api_key=248bf5a1d431a3b6f1ea00297d676788'
   

    const fet = async() =>{
      const req = await fetch(apiBase).then(response => response.json()).then(results => results.results)
      return req

    }
    const {data, isLoading, isSuccess, } = useQuery(
      "get", 
     fet)
  if(isLoading){
    return (

      <View>
          <Text>
          loading...
          </Text>
      </View>
    )
    
  }
   const renderItem = ({item}) =>{
     return(
       
     <View style={styles.card}>
        <Image source={{uri : `https://image.tmdb.org/t/p/w300${item.poster_path}`}} style={{width : 130, height : 200}} />
        <View  style={{justifyContent : 'center'}}>
            <Text> Título : {item.original_name}</Text>
            <Text> Gênero : {item.genero}</Text>
            <Text> Estreia : {item.first_air_date}</Text>

        </View>

      </View>
       
     )
   }

  if(isSuccess){
    return(
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id}/>
    )
      
  }
}

const QueryProvider = () => {
  const queryClient = new   QueryClient()
  return(
    <QueryClientProvider client ={queryClient}>
        <App/>
    </QueryClientProvider>
  )

}
 export default QueryProvider

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card : {
    flexDirection : 'row',
    margin : 10,
    borderWidth : 1,
    padding : 4
    
    
  }
});
