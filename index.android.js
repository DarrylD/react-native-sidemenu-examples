/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Platform,
    TouchableOpacity,
    Animated
} from 'react-native';

import Sidemenu from './components/Sidemenu';
import Fabmenu from './components/Fabmenu';

// need this to have LayoutAnimation work on android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


class App extends Component {

    constructor(){
        super()

        this.state = {
            open:false
        }
    }

    handleToggleMenu(selection){
        this.setState({open: selection || !this.state.open})
    }

    afterAnimation(){
        console.log('animated')
    }

    render() {

        return (
            <Fabmenu active={this.state.open} afterAnimation={()=> this.afterAnimation()} handleToggleMenu={()=>this.handleToggleMenu()}>

                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Side Menu Example
                    </Text>

                    <TouchableOpacity style={styles.btn} onPress={()=> this.handleToggleMenu()}>
                        <Text style={{color:'white'}}>Show Menu</Text>
                    </TouchableOpacity>
                </View>

            </Fabmenu>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 2,
        backgroundColor: '#11c1f3',
        marginLeft:30,
        marginRight:30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 4
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

AppRegistry.registerComponent('NativeSidemenu', () => App);
