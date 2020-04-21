import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {Header, SearchBar, Overlay} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import {connect} from 'react-redux';
import {
  getCountries,
  getConfirm,
  getAll,
  getIndonesiaData,
} from '../src/redux/action';
import Loading from 'react-native-spinkit';

const color1 = '#161A1E';
const color2 = '#8B9098';
const color3 = '#1A222F';
const color4 = '#3C434F';
const colorTotal = '#F3BA00';
const colorM = '#D4594E';
const colorS = '#00DEA3';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      countries: [],
      search: '',
      country: 'Indonesia',
      all1: 1,
      all2: 1,
      all3: 1,
      ina: {},
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  componentDidMount = () => {
    this.fetchAll();
  };

  fetchAll = () => {
    this.setState({country: 'Indonesia'}, () => {
      this._getAll();
      this._getConfirm();
      this._getCountries();
    });
  };

  _getCountries = () => {
    this.props.getC1().then(() => {
      this.setState({countries: this.props.data.countries});
    });
  };

  _getConfirm = () => {
    if (this.state.country === 'Indonesia') {
      this.props.getIna().then(() => {
        this.props.data.ina.map(res => {
          this.setState({ina: res});
        });
      });
    } else {
      this.props.getC2(this.state.country);
    }
  };

  _getAll = () => {
    this.props.getA().then(() => {
      const {all} = this.props.data;
      this.setState({all3: all.cases, all2: all.recovered, all1: all.deaths});
    });
  };

  _doSearch = text => {
    if (!text) {
      this.setState({
        countries: this.props.data.countries,
        search: text,
      });
    } else {
      const newData = this.props.data.countries.filter(item => {
        const itemData = item.country
          ? item.country.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        countries: newData,
        search: text,
      });
    }
  };

  render() {
    const {data} = this.props;
    const {all1, all2, all3, ina} = this.state;
    let perR, perD;
    if (this.state.country === 'Indonesia') {
      perR = Number((ina.sembuh / ina.positif) * 100).toFixed(2);
      perD = Number((ina.meninggal / ina.positif) * 100).toFixed(2);
    } else {
      perR = Number(
        (data.confirm.recovered / data.confirm.cases) * 100,
      ).toFixed(2);
      perD = Number((data.confirm.deaths / data.confirm.cases) * 100).toFixed(
        2,
      );
    }
    const persentR1 = Number(
      (data.all.recovered / data.all.cases) * 100,
    ).toFixed(2);
    const persentD1 = Number((data.all.deaths / data.all.cases) * 100).toFixed(
      2,
    );

    const chart_wh = 200;
    const series = [all1, all2, all3];
    const sliceColor = [colorM, colorS, colorTotal];
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
            rightComponent={{
              icon: 'autorenew',
              color: '#fff',
              onPress: () => this.fetchAll(),
            }}
            containerStyle={{
              height: Platform.select({
                android: 56,
                default: 44,
              }),
              paddingTop: 0,
              backgroundColor: color1,
            }}
          />
          <TouchableOpacity
            style={[
              st.inputBox,
              {alignSelf: 'center', paddingVertical: 16, marginTop: 24},
            ]}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Icon
              style={st.icon}
              name="keyboard-arrow-down"
              size={25}
              color={'#8B9098'}
              style={{position: 'absolute', top: 15, right: 15}}
            />

            <Text style={{color: '#8B9098'}}>{this.state.country}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.setState({search: ''});
            }}>
            <SafeAreaView
              style={{
                flex: 1,
                paddingTop: hp('2'),
                backgroundColor: color1,
              }}>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{position: 'absolute', left: 0}}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Icon name="close" size={20} color={'#fff'} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Pilih Negara
                  </Text>
                  <></>
                </View>
                <SearchBar
                  placeholder="Cari Negara ..."
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
              </View>

              <FlatList
                data={this.state.countries}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({country: item.country}, () => {
                        this.setModalVisible(false);
                        this._getConfirm();
                      });
                    }}>
                    <View style={st.vCityList}>
                      <Text style={{color: color2}}>{item.country}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                enableEmptySections={true}
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
                      Negara tidak ditemukan!
                    </Text>
                  </View>
                }
                style={{marginTop: 10}}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
          </Modal>
          <ScrollView>
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
                {this.state.country === 'Indonesia'
                  ? ina.name
                  : data.confirm.country}
              </Text>
              <Text style={{color: color2}}>
                Last update at{' '}
                {moment(data.all.update).format('DD MMMM YYYY, HH:mm:ss')}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: hp('3.2')}}>
                <View style={{alignItems: 'center'}}>
                  <NumberFormat
                    value={
                      this.state.country === 'Indonesia'
                        ? ina.sembuh
                        : data.confirm.recovered
                    }
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
                    ({perR}
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
                    value={
                      this.state.country === 'Indonesia'
                        ? ina.positif
                        : data.confirm.cases
                    }
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
                    Kasus
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <NumberFormat
                    value={
                      this.state.country === 'Indonesia'
                        ? ina.meninggal
                        : data.confirm.deaths
                    }
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
                    ({perD}
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
            <View
              style={{
                backgroundColor: color3,
                marginHorizontal: 16,
                marginVertical: 24,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: hp('2'),
              }}>
              <PieChart
                chart_wh={chart_wh}
                series={series}
                sliceColor={sliceColor}
                doughnut={true}
                coverRadius={0.72}
                coverFill={color3}
              />
              <View style={{alignItems: 'center', marginTop: hp('3.6')}}>
                <NumberFormat
                  value={data.all.cases}
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
                  Total Kasus di Dunia
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: hp('3.2'),
                }}>
                <View style={{alignItems: 'center', marginRight: wp('36')}}>
                  <NumberFormat
                    value={data.all.recovered}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    prefix={''}
                    decimalSeparator={','}
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
                    ({persentR1}%)
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

                <View style={{alignItems: 'center'}}>
                  <NumberFormat
                    value={data.all.deaths}
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
                    ({persentD1}%)
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
              <View
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  top: hp('12'),
                }}>
                <NumberFormat
                  value={data.all.deaths + data.all.recovered + data.all.cases}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={''}
                  decimalSeparator={','}
                  renderText={value => (
                    <Text
                      style={{
                        color: 'white',
                        fontSize: wp('5.4'),
                        fontWeight: 'bold',
                      }}>
                      {value}
                    </Text>
                  )}
                />
                <Text style={{color: color2}}>Cases Reported</Text>
              </View>
            </View>
            {/* <Text
              style={{
                color: color2,
                marginBottom: hp('2.4'),
                textAlign: 'center',
              }}>
              Data Source: https://corona.lmao.ninja
            </Text> */}
          </ScrollView>
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
  getIna: () => dispatch(getIndonesiaData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
