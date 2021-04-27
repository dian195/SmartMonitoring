
import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, Button, TouchableHighlight } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import _ from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
    this.onPressBTN = this.onPressBTN.bind(this);
    this.state = {
      images: [
        //"https://source.unsplash.com/1600x900/?nature",
        //"https://source.unsplash.com/1024x768/?water",
        //"https://source.unsplash.com/1024x768/?girl",
        //"https://source.unsplash.com/1024x768/?tree",
        require('./src/assets/1.jpeg'),
        require('./src/assets/2.jpeg'),
        require('./src/assets/3.jpeg'),
        require('./src/assets/4.jpeg'),
        require('./src/assets/5.jpeg'),
        require('./src/assets/6.jpeg'),
      ],
      array: [],
      arrayColor: []
    };
  }

  onPressBTN(txt) {
    this.setState(
      { 
        array: []
      }
    );
    
    axios
    .get('https://smartmon.univrab.ac.id/api/mobile?location_id=' + txt)
    .then(({ data })=> {
      console.log(data);
      if (data.status == true)
      {
        this.setState(
          { 
            array: data.data
          }
        );
      }
      else
      {
        this.setState(
          { 
            array: []
          }
        );
      }

    })
    .catch((err)=> {})
  }

  onPressBTN2(txt) {
    this.setState(
      { 
        arrayColor: []
      }
    );
    
    axios
    .get('https://smartmon.univrab.ac.id/api/mobile?location_id=' + txt)
    .then(({ data })=> {
      console.log(data);
      if (data.status == true)
      {
        this.setState(
          { 
            arrayColor: data.data
          }
        );
      }
      else
      {
        this.setState(
          { 
            arrayColor: []
          }
        );
      }

    })
    .catch((err)=> {})
  }

  
  render() {
    return (
      <View style={{ flex:1}}>
        {/* <Text>SMART MONITORING</Text> */}
        <View style={{height:100, marginTop:10, marginLeft:15, marginRight:10}}>
          <Text style={{fontSize:30,fontWeight:"bold"}}>SMART MONITORING</Text>
          <Text style={{fontSize:15,opacity:0.3}}>Forestry Wildfire Response</Text>
        </View>
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={230}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
                                position: "absolute",
                                bottom: -25,
                                padding: 0,
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                                paddingVertical: 0
                              }}
        dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.92)"
                  }}
      ImageComponentStyle={{borderRadius: 15, width: '92%', marginTop: 5}}
      imageLoadingColor="#2196F3"
        />
      </View>
      <View style={{height:20}}></View>
        <View style={{flexDirection:"row",marginLeft:15,marginRight:10,marginBottom:50}}>
          <View style={{flex:1, height:40,borderRadius:12,justifyContent:"center"}}>
            {/*<Button onPress={() => this.onPressBTN('1')}  title="Lokasi 1" color={this.renderColorButton()} />*/}
            { this.renderLokasi1() }
          </View>
          <View style={{flex:1, height:40,borderRadius:12,marginRight:10,marginLeft:10,justifyContent:"center"}}>
            { /*<Button onPress={() => this.onPressBTN('1')}  title="Lokasi 2" color={this.renderColorButton()} /> */ }
            { this.renderLokasi2() }
          </View>
          <View style={{flex:1, height:40,borderRadius:12,justifyContent:"center"}}>
            { /*<Button onPress={() => this.onPressBTN('3')}  title="Lokasi 3" color={this.renderColorButton()} /> */ }
            { this.renderLokasi3() }
          </View>

          
        </View> 
        <View style={{height:50,marginLeft:15, marginRight:10}}>
          <Text style={{fontSize:15,fontWeight:"bold"}}>Monitoring Location</Text>
          {this.renderLastUpdate()}
        </View>
        <View style={{flexDirection:"row", flex:1,marginLeft:15, marginRight:10,backgroundColor:"#f5f5f5",borderRadius:12}}>
            <View style={{backgroundColor:"white", flex:1,borderRadius:12, marginBottom:10}}>
              <View style={{flex:1}}><Text style={{marginTop:25,marginLeft:15}}><Icon name="temperature-high" size={20} color="orange"/></Text></View>
              <View style={{flex:1, justifyContent:"center"}}><Text style={{textAlign:"center",fontWeight:"bold"}}>Temperature</Text></View>
              {this.renderTemperature()}
            </View>
            <View style={{backgroundColor:"white", flex:1,borderRadius:12, marginRight:10,marginLeft:10, marginBottom:10}}>
            <View style={{flex:1}}><Text style={{marginTop:25,marginLeft:15}}><Icon2 name="droplet" size={20} color="blue"/></Text></View>
              <View style={{flex:1, justifyContent:"center"}}><Text style={{textAlign:"center",fontWeight:"bold"}}>Soil Mosture</Text></View>
              {this.renderSoilMosture()}
            </View>
            <View style={{backgroundColor:"white", flex:1,borderRadius:12, marginBottom:10}}>
            <View style={{flex:1}}><Text style={{marginTop:25,marginLeft:15}}><Icon2 name="droplet" size={20} color="blue"/></Text></View>
              <View style={{flex:1, justifyContent:"center"}}><Text style={{textAlign:"center",fontWeight:"bold"}}>Humidity</Text></View>
              {this.renderSoilHumidity()}
            </View>
          </View>
      </View>
    );
  }

  renderLastUpdate() {
    return _.map(this.state.array, getData => {
      return (
        <Text style={{fontSize:15,opacity:0.3}}>Last Update: {getData.last_update}</Text>
      );
    });
  }

  renderTemperature() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}>{getData.suhu}</Text></View>
        );
      });
    }
    else
    {
      return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}></Text></View>
        );
    }
  }

  renderSoilMosture() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}>{getData.kelembapan_tanah}</Text></View>
        );
      });
    }
    else
    {
      return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}></Text></View>
        );
    }
  }

  renderSoilHumidity() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}>{getData.kelembapan_udara} | {getData.warna}</Text></View>
        );
      });
    }
    else
    {
      return (
          <View style={{flex:1}}><Text style={{opacity:0.3,fontWeight:"bold", marginTop:10,marginLeft:15}}></Text></View>
        );
    }
  }

  renderLokasi1() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <Button onPress={() => this.onPressBTN('1')}  title="Lokasi 1" color={getData.location_id == '1' ? getData.warna : '#0a89f7'} />
        );
      });
    }
    else
    {
      return (
        <Button onPress={() => this.onPressBTN('1')}  title="Lokasi 1" color="#0a89f7" />
        );
    }
  }

  renderLokasi2() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <Button onPress={() => this.onPressBTN('2')}  title="Lokasi 2" color={getData.location_id == '2' ? getData.warna : '#0a89f7'} />
        );
      });
    }
    else
    {
      return (
        <Button onPress={() => this.onPressBTN('2')}  title="Lokasi 2" color="#0a89f7" />
        );
    }
  }

  renderLokasi3() {
    if (this.state.array && this.state.array.length)
    {
      return _.map(this.state.array, getData => {
        return (
          <Button onPress={() => this.onPressBTN('3')}  title="Lokasi 3" color={getData.location_id == '3' ? getData.warna : '#0a89f7'} />
        );
      });
    }
    else
    {
      return (
        <Button onPress={() => this.onPressBTN('3')}  title="Lokasi 3" color="#0a89f7" />
        );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button1:{
    backgroundColor:'#ff5c5c',
  }
});

export default App;
