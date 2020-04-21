import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {Header, SearchBar, Overlay} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import {getProv} from '../src/redux/action';
import Loading from 'react-native-spinkit';

const color1 = '#161A1E';
const color3 = '#1A222F';
const color4 = '#3C434F';
const colorTotal = '#F3BA00';
const colorM = '#D4594E';
const colorS = '#00DEA3';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      prov: [],
      refreshing: false,
    };
  }

  handleRefresh = () => {
    this.setState({search: ''});
    this._getProvinsi();
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  componentDidMount = () => {
    this._getProvinsi();
  };

  _getProvinsi = () => {
    this.props.getP().then(() => {
      this.setState({prov: this.props.data.prov});
    });
  };

  _doSearch = text => {
    if (!text) {
      this.setState({
        prov: this.props.data.prov,
        search: text,
      });
    } else {
      const newData = this.props.data.prov.filter(item => {
        const itemData = item.attributes.Provinsi
          ? item.attributes.Provinsi.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        prov: newData,
        search: text,
      });
    }
  };

  render() {
    const {prov} = this.state;

    return (
      <>
        <SafeAreaView style={st.container}>
          <Header
            placement="left"
            leftComponent={
              <Image
                style={{width: wp('12'), height: hp('6')}}
                source={require('./img/lg.png')}
              />
            }
            centerComponent={
              <Text style={[st.text, {color: 'rgba(255,255,255, 1)'}]}>
                Covid
                <Text style={[st.text, {color: 'rgba(181,61,64,1)'}]}>19</Text>
              </Text>
            }
            containerStyle={{
              height: Platform.select({
                android: 56,
                default: 44,
              }),
              paddingTop: 0,
              backgroundColor: color1,
            }}
          />
          <SearchBar
            placeholder="Cari Provinsi ..."
            placeholderTextColor="#8B9098"
            onChangeText={e => this._doSearch(e)}
            onClear={() => this._doSearch('')}
            value={this.state.search}
            containerStyle={{
              backgroundColor: color1,
              paddingVertical: 6,
            }}
            inputContainerStyle={{
              backgroundColor: color3,
              borderRadius: 10,
              borderWidth: wp('0.2'),
              borderColor: color4,
              width: wp('92'),
              alignSelf: 'center',
            }}
          />
          <FlatList
            data={prov}
            keyExtractor={item => item.attributes.FID.toString()}
            enableEmptySections={true}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            style={{marginBottom: hp('2.4')}}
            ListEmptyComponent={
              <View
                style={{
                  marginTop: hp('3.6'),
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: wp('54'), height: hp('27')}}
                  source={require('./img/no.png')}
                />
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  Daerah yang anda cari tidak ditemukan! Maaf ya :(
                </Text>
              </View>
            }
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: color3,
                  marginHorizontal: 16,
                  marginTop: 14,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: hp('2'),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('4.2'),
                    fontWeight: 'bold',
                  }}>
                  {item.attributes.Provinsi}
                </Text>
                {/* <Text style={{color: color2}}>
                  Last update at{' '}
                  {moment(data.all.update).format('DD MMMM YYYY, HH:mm:ss')}
                </Text> */}
                <View style={{flexDirection: 'row', marginVertical: hp('3.2')}}>
                  <View style={{alignItems: 'center'}}>
                    <NumberFormat
                      value={item.attributes.Kasus_Semb}
                      displayType={'text'}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix={''}
                      renderText={value => (
                        <Text
                          style={{
                            color: colorS,
                            fontSize: wp('5.4'),
                            fontWeight: 'bold',
                          }}>
                          {value}
                        </Text>
                      )}
                    />
                    <Text
                      style={{
                        color: colorS,
                        fontSize: wp('3.6'),
                        fontWeight: 'bold',
                      }}>
                      (
                      {Number(
                        (item.attributes.Kasus_Semb /
                          item.attributes.Kasus_Posi) *
                          100,
                      ).toFixed(2)}{' '}
                      %)
                    </Text>
                    <Text
                      style={{
                        color: colorS,
                        fontSize: wp('3.6'),
                        fontWeight: 'bold',
                      }}>
                      Sembuh
                    </Text>
                  </View>
                  <View
                    style={{alignItems: 'center', marginHorizontal: wp('16')}}>
                    <NumberFormat
                      value={item.attributes.Kasus_Posi}
                      displayType={'text'}
                      thousandSeparator={'.'}
                      prefix={''}
                      decimalSeparator={','}
                      renderText={value => (
                        <Text
                          style={{
                            color: colorTotal,
                            fontSize: wp('5.4'),
                            fontWeight: 'bold',
                          }}>
                          {value}
                        </Text>
                      )}
                    />
                    <Text
                      style={{
                        color: colorTotal,
                        fontSize: wp('3.6'),
                        fontWeight: 'bold',
                      }}>
                      Positif
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <NumberFormat
                      value={item.attributes.Kasus_Meni}
                      displayType={'text'}
                      thousandSeparator={'.'}
                      prefix={''}
                      decimalSeparator={','}
                      renderText={value => (
                        <Text
                          style={{
                            color: colorM,
                            fontSize: wp('5.4'),
                            fontWeight: 'bold',
                          }}>
                          {value}
                        </Text>
                      )}
                    />
                    <Text
                      style={{
                        color: colorM,
                        fontSize: wp('3.6'),
                        fontWeight: 'bold',
                      }}>
                      (
                      {Number(
                        (item.attributes.Kasus_Meni /
                          item.attributes.Kasus_Posi) *
                          100,
                      ).toFixed(2)}{' '}
                      %)
                    </Text>
                    <Text
                      style={{
                        color: colorM,
                        fontSize: wp('3.6'),
                        fontWeight: 'bold',
                      }}>
                      Meninggal
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />

          <Overlay
            isVisible={this.props.data.isLoading ? true : false}
            windowBackgroundColor={'rgba(26,34,47,0.6)'}
            overlayBackgroundColor="#fff"
            width="auto"
            height="auto">
            <Loading
              style={{margin: 16}}
              type="9CubeGrid"
              size={54}
              color={'rgba(181,61,64,0.8)'}
            />
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color1,
  },
  text: {
    fontSize: wp('5.4'),
    fontWeight: 'bold',
  },
  inputBox: {
    width: wp('90'),
    backgroundColor: '#1A222F',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
    height: 54,
    borderColor: '#3C434F',
    borderWidth: wp('0.2'),
  },
  icon: {
    position: 'absolute',
    top: 40,
    right: 30,
  },
  vCityList: {
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 16,
    flex: 1,
    backgroundColor: color3,
    width: wp('100'),
    margin: 0,
    paddingHorizontal: wp('2.4%'),
  },
});

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = dispatch => ({
  getC1: () => dispatch(getCountries()),
  getC2: country => dispatch(getConfirm(country)),
  getA: () => dispatch(getAll()),
  getP: () => dispatch(getProv()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
