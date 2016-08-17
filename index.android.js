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
    Animated,
    Dimensions
} from 'react-native';

import Slidemenu from './components/Slidemenu';
import Sidemenu from './components/Sidemenu';
import Fabmenu from './components/Fabmenu';

import { Button } from 'carbon-native';

const {height, width} = Dimensions.get('window');



// need this to have LayoutAnimation work on android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


class App extends Component {

    constructor(){
        super()

        this.state = {
            open:false,
            currentMenu: 'slide'
        }
    }

    handleToggleMenu(selection){
        this.setState({open: selection || !this.state.open})
    }

    handleChangeMenu(currentMenu){
        this.setState({currentMenu})
    }

    afterAnimation(){
        console.log('animated')
    }

    renderDemoText(){
        return (
            <Text style={styles.welcome}>
                Side Menu Example
            </Text>
        )
    }

    renderDemoButton(){
        return (
            <TouchableOpacity style={styles.btn} onPress={()=> this.handleToggleMenu()}>
                <Text style={{color:'white'}}>Show Menu</Text>
            </TouchableOpacity>
        )
    }


    render() {

        if(this.state.currentMenu === 'fab') {
            return (
                <Fabmenu active={this.state.open} afterAnimation={()=> this.afterAnimation()} handleChangeMenu={(d)=> this.handleChangeMenu(d)} handleToggleMenu={()=>this.handleToggleMenu()}>
                    <View style={[styles.container]}>
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Fabmenu>
            );
        }

        if(this.state.currentMenu === 'side') {
            return (
                <Sidemenu active={this.state.open} afterAnimation={()=> this.afterAnimation()} handleChangeMenu={(d)=> this.handleChangeMenu(d)} handleToggleMenu={()=>this.handleToggleMenu()}>
                    <View style={[styles.container]}>
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Sidemenu>
            );
        }

        if(this.state.currentMenu === 'slide') {
            return (
                <Slidemenu active={this.state.open} afterAnimation={()=> this.afterAnimation()} handleChangeMenu={(d)=> this.handleChangeMenu(d)} handleToggleMenu={()=>this.handleToggleMenu()}>
                    <View style={[styles.container, { borderRadius: 20 }]}>
                        <Button
                            color="primary"
                            text="Outline Button"
                            outline
                            />
                        {this.renderDemoText()}
                        {this.renderDemoButton()}
                    </View>
                </Slidemenu>
            );
        }


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
