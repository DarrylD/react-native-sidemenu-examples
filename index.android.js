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

// need this to have LayoutAnimation work on android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class NativeSidemenu extends Component {

    constructor(){
        super()

        this.state = {
            active:false,
            fadeAnim: new Animated.Value(0),
            shrink: new Animated.Value(0),
        }

        this.setAnimation();
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();

        this.setAnimation();
    }

    setAnimation(){
        Animated.spring(this.state.shrink, {
            toValue: -.2,  // Returns to the start
            velocity: 3,   // Velocity makes it move
            tension: -4,   // Slow
            friction: 4,   // Oscillate a lot
        }).start();
    }

    handleActivateMenu(){
        this.setState({active:!this.state.active}, this.handleActivateMenuComplete)
    }

    handleActivateMenuComplete(){

        const animationOptions =  {
            toValue: this.state.active ? 1 : 0,
            duration: 550,
        }

        Animated
            .timing(this.state.fadeAnim, animationOptions )
            .start()

    }

    render() {

        const menuState = this.state.active
            ? styles.menuActive
            : styles.menu

        const links = [
            'Home',
            'Profile',
            'Favorites',
            'Entries',
            'Search',
            'Logout',
        ]

        const last = links.length - 1

        const animatedInStyles = {
            transform: [
                {
                    scale: this.state.shrink.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 2],
                    })
                },
            ],
            flex: 5,
            right: -180,
            borderRadius: 4,
        }

        const animatedOutStyles = {
            transform: [
                {
                    scale: this.state.shrink.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.5, 4],
                    })
                },
            ],
            flex: 1,
            right: 0,
            borderRadius: 4,
        }

        const activeMenu = this.state.active
            ? animatedInStyles
            : animatedOutStyles

        return (
            <View style={styles.outer}>

                <View style={menuState}>
                    <Animated.View  style={{opacity: this.state.fadeAnim}}>
                        {links.map( (name, i) =>
                            <TouchableOpacity key={name} style={[styles.linkWrapper, i === last ? styles.last : null]} onPress={()=> this.handleActivateMenu()} >
                                <Text style={styles.link}>{name}</Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                </View>

                <Animated.View style={[styles.outer, activeMenu]}>
                    <View style={[styles.container]} >
                        <Text style={styles.welcome} onPress={()=> this.setState({active:!this.state.active})} >
                            Side Menu Example
                        </Text>

                        <TouchableOpacity style={styles.btn} onPress={()=> this.handleActivateMenu()}>
                            <Text style={{color:'white'}}>Show Menu</Text>
                        </TouchableOpacity>

                    </View>
                </Animated.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    outer: {
        backgroundColor: '#ccc',
        flex: 1,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 2,
        backgroundColor: '#11c1f3',
        marginLeft:30,
        marginRight:30
    },
    menu:{
        position:'absolute',
        margin: 20,
        left: -50
    },
    menuActive:{
        position:'absolute',
        margin: 20,
        left: 0
    },
    linkWrapper:{
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        marginBottom: 20,
        width: 100,
        paddingLeft:10
    },
    last:{
        borderBottomWidth: 0,
    },
    link:{
        paddingTop:10,
        paddingBottom:10,
        fontSize:18
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ddd',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

AppRegistry.registerComponent('NativeSidemenu', () => NativeSidemenu);
