
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SelectList from "react-native-dropdown-select-list";


class Inputs extends Component {
  state = {
    height: '',
    weight: '',
    Bmi: '',
    BmiResult: '',
  }
  Height = (text) => {
    this.setState({ height: text })
  }
  Weight = (text) => {
    this.setState({ weight: text })
  }

  calculate = (height, weight) => {

    var result = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
    result = result.toFixed(2);
    this.setState({ Bmi: result })

    if (result < 18.5) { this.setState({ BmiResult: 'Z A Y I F' }) }
    else if (18.5 < result && result < 24.9) { this.setState({ BmiResult: ' N O R M A L' }) }
    else if (25 < result && result < 29.9) { this.setState({ BmiResult: ' Ş İ Ş M A N' }) }
    else if (30 < result && result < 34.9) { this.setState({ BmiResult: ' O B E Z' }) }
    else if (35 < result) { this.setState({ BmiResult: ' A Ş I R I  O B E Z' }) }
    else {
      alert('Yanlış Giriş');
      this.setState({ BmiResult: '' })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vücut Kitle Endeksi Hesaplama</Text>
        <Text style={styles.label}>Kilo</Text>
        <TextInput style={styles.Input}
          placeholder="Kilonuzu Giriniz ( kg )"
          onChangeText={this.Weight} />

        <Text style={styles.label}>Boy</Text>
        <TextInput style={styles.Input}
          placeholder="Boyunuzu Giriniz ( cm ) "
          onChangeText={this.Height} />

        <TouchableOpacity style={styles.button}
          onPress={() => this.calculate(this.state.height, this.state.weight)}>
          <Text style={styles.buttonText}>H E S A P L A</Text>
        </TouchableOpacity>

        <Text style={styles.output}>{this.state.Bmi}</Text>
        <Text style={styles.resultText}>{this.state.BmiResult}</Text>
      </View>
    )
  }
}
class BasalMetabolic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      BmrHeight: '',
      BmrWeight: '',
      Bmr: '',
      BmrAge: '',
      gender: 'kadın',
      open: false,
      value: null,
      items: [
        { label: 'Kadın', value: 'kadın' },
        { label: 'Erkek', value: 'erkek' }
      ]
    }
    this.setValue = this.setValue.bind(this);
  }

  handleHeightBmr = (text) => {
    this.setState({ BmrHeight: text })
  }
  handleWeightBmr = (text) => {
    this.setState({ BmrWeight: text })
  }
  handleAge = (text) => {
    this.setState({ BmrAge: text })
  }

  BmrCalculate = (BmrHeight, BmrWeight, BmrAge) => {
    if (this.state.value == "kadın") {
      var result2 = (655.1 + (parseFloat(BmrWeight) * 9.563) + (parseFloat(BmrHeight) * 1.850) - (parseFloat(BmrAge) * 4.676));
      result2 = result2.toFixed(2);
      this.setState({ Bmr: result2 })
    }
    else if (this.state.value == "erkek") {
      var result2 = (66.47 + (parseFloat(BmrWeight) * 13.75) + (parseFloat(BmrHeight) * 5.003) - (parseFloat(BmrAge) * 6.755));
      result2 = result2.toFixed(2);
      this.setState({ Bmr: result2 })
    }

  }

  setOpen = (open) => {
    this.setState({
      open
    });
  }
  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }
  setItems = (callback) => {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  render() {
    const { open, items, value } = this.state;
    return (
      <View>
        <Text style={styles.title}>Bazal Metabolizma Hesaplama</Text>
        <DropDownPicker

          open={open}
          items={items}
          value={value}
          placeholder="Cinsiyet seçiniz"
          setOpen={this.setOpen}
          setValue={this.setValue}
          setItems={this.setItems}
          dropDownContainerStyle={{
            backgroundColor: "white",
          }}
          itemProps={{
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              height: 40
            }
          }}

          style={{
            backgroundColor: "white"
          }}
          containerStyle={{
            backgroundColor: "white"
          }}
        />

        <Text style={styles.label}>Kilo</Text>
        <TextInput style={styles.Input}
          placeholder="Kilonuzu Giriniz ( kg )"
          onChangeText={this.handleWeightBmr} />

        <Text style={styles.label}>Boy</Text>
        <TextInput style={styles.Input}
          placeholder="Boyunuzu Giriniz ( cm ) "
          onChangeText={this.handleHeightBmr} />

        <Text style={styles.label}>Yaş</Text>
        <TextInput style={styles.Input}
          placeholder="Yaşınızı Giriniz ( cm ) "
          onChangeText={this.handleAge} />

        <TouchableOpacity style={styles.button}
          onPress={() => this.BmrCalculate(this.state.BmrHeight, this.state.BmrWeight, this.state.BmrAge)}>
          <Text style={styles.buttonText}>H E S A P L A</Text>
        </TouchableOpacity>

        <Text style={styles.output}>{this.state.Bmr}</Text>

      </View>
    )
  }
}

export default class Calories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CalHeight: ' ',
      CalWeight: ' ',
      CalAge: ' ',
      result3: '',
      key:null,
      key1:null,
      Activity: [
        { value: 'Az veya hiç hareket yok', key: 'Aktif1'  },
        { value: 'Haftada 1-3 gün hafif egzersiz', key: ' Aktif2' },
        { value: 'Haftada 3-5 gün orta derece egzersiz', key: 'Aktif3' },
        { value: 'Haftada 6-7 gün ağır egzersiz', key: 'Aktif4' },
        { value: 'Çok ağır egzersiz', key: 'Aktif5' }
      ],
      Gender:[
        { value: 'Kadın', key1: 'kadın'  },
        { value: 'Erkek', key1: 'erkek'  },
      ]
    }
    this.setSelected=this.setSelected.bind(this);
    this.setSelected2=this.setSelected2.bind(this);
  }

  handleHeightCal = (text) => {
    this.setState({ CalHeight: text })
  }
  handleWeightCal = (text) => {
    this.setState({ CalWeight: text })
  }
  handleAgeCal = (text) => {
    this.setState({ CalAge: text })
  }

  setSelected=(callback)=>{
    this.setState(state=>({
      key:state.key
      
    }));
  }
  setSelected2=(callback)=>{
    this.setState(state=>({
      key1:state.key1
    }));
  }

  CalCalculate = (CalHeight, CalWeight, CalAge) => {
    if (this.state.key1 == "kadın") {
      var BmrCal = (655.1 + (parseFloat(CalWeight) * 9.563) + (parseFloat(CalHeight) * 1.850) - (parseFloat(CalAge) * 4.676));
     if (this.state.key=="Aktif1") {
        Cal=parseFloat(BmrCal) * 1.2;
        this.setState({result3:Cal})
      }
      else if (this.state.key=="Aktif2") {
        Cal=parseFloat(BmrCal) * 1.375;
        this.setState({result3:Cal})
      }
      else if (this.state.key=="Aktif3") {
        Cal=parseFloat(BmrCal) * 1.55;
        this.setState({result3:Cal})
      }
      else if (this.state.key=="Aktif4") {
        Cal=parseFloat(BmrCal) * 1.725;
        this.setState({result3:Cal})
      }
      else if (this.state.key=="Aktif5") {
        Cal=parseFloat(BmrCal) * 1.9;
        this.setState({result3:Cal})
      }
    }
    else if (this.state.key1 == "erkek") {
      var BmrCal = (66.47 + (parseFloat(CalWeight) * 13.75) + (parseFloat(CalHeight) * 5.003) - (parseFloat(CalAge) * 6.755));
      if (this.state.key=="Aktif1") {
        Cal=parseFloat(BmrCal) * 1.2;
        this.setState({result3:Cal})
      }
      else if (this.state.key=="Aktif2") {
        Cal=parseFloat(BmrCal) * 1.375;
        this.setState({result3: Cal})
      }
      else if (this.state.key=="Aktif3") {
        Cal=parseFloat(BmrCal) * 1.55;
        this.setState({result3: Cal})
      }
      else if (this.state.key=="Aktif4") {
        Cal=parseFloat(BmrCal) * 1.725;
        this.setState({result3: Cal})
      }
      else if (this.state.key=="Aktif5") {
        Cal=parseFloat(BmrCal) * 1.9;
        this.setState({result3:Cal})
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Text style={styles.title}>Günlük Kalori İhtiyacı Hesaplama</Text>

        <SelectList
        data={this.state.Activity}
        setSelected={this.setSelected}
        placeholder="Cinsiyet seçiniz"
        dropdownStyles={{backgroundColor:'gray'}}
        dropdownItemStyles={{marginHorizontal:10}}
        dropdownTextStyles={{color:'white'}}
        />

        <SelectList
        data={this.state.Gender}
        setSelected={this.setSelected}
        placeholder="Cinsiyet seçiniz"
        dropdownStyles={{backgroundColor:'gray'}}
        dropdownItemStyles={{marginHorizontal:10}}
        dropdownTextStyles={{color:'white'}}
        />

        <Text style={styles.label}>Kilo</Text>
        <TextInput style={styles.Input}
          placeholder="Kilonuzu Giriniz ( kg )"
          onChangeText={this.handleWeightCal} />

        <Text style={styles.label}>Boy</Text>
        <TextInput style={styles.Input}
          placeholder="Boyunuzu Giriniz ( cm ) "
          onChangeText={this.handleHeightCal} />

        <Text style={styles.label}>Yaş</Text>
        <TextInput style={styles.Input}
          placeholder="Yaşınızı Giriniz ( cm ) "
          onChangeText={this.handleAgeCal} />

        <TouchableOpacity style={styles.button}
          onPress={() => this.CalCalculate(this.state.CalHeight, this.state.CalWeight, this.state.CalAge)}>
          <Text style={styles.buttonText}>H E S A P L A</Text>
        </TouchableOpacity>
        <Text style={styles.output}>{this.state.result3}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    margin: 15,

  },
  Input: {
    margin: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,

  },
  button: {
    textAlign: "center",
    color: 'white',
    fontSize: 18,
    paddingLeft: 120,
    paddingTop: 10,
  },
  output: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor:"blue"
  },
  resultText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: 'blue',
  }

})

