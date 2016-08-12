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


export default class Sidemenu extends Component {

    constructor(props){
        super(props)

        this.state = {
            active:false,
            fadeAnim: new Animated.Value(0),
            shrink: new Animated.Value(0),
        }

        this.setAnimation();

        this.links = [
            'Home',
            'Profile',
            'Favorites',
            'Entries',
            'Search',
            'Logout',
        ]

        this.animatedInStyles = {
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
        }

        this.animatedOutStyles = {
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
        }
    }


    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();

        this.setAnimation();
    }

    componentWillReceiveProps(nextProps){
        this.setState({active:nextProps.active}, this.handleActivateMenuComplete)
    }

    setAnimation(){

        const animationOptions ={
            toValue: -.2,  // Returns to the start
            velocity: 3,   // Velocity makes it move
            tension: -4,   // Slow
            friction: 4,   // Oscillate a lot
        }

        Animated
            .spring(this.state.shrink, animationOptions)
            .start();
    }

    handleActivateMenu(){
        this.props.afterMenuClick()
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

    renderMenu(){

        const menuState = this.props.active
            ? styles.menuActive
            : styles.menu

        const last = this.links.length - 1

        return (
            <View style={menuState}>
                <Animated.View  style={{opacity: this.state.fadeAnim}}>
                    {this.links.map( (name, i) =>
                        <TouchableOpacity key={name} style={[styles.linkWrapper, i === last ? styles.last : null]} onPress={()=> this.handleActivateMenu()} >
                            <Text style={styles.link}>{name}</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </View>
        )

    }

    render() {

        const activeMenu = this.props.active
            ? this.animatedInStyles
            : this.animatedOutStyles

        return (
            <View style={styles.outer}>

                {this.renderMenu()}

                <Animated.View style={[styles.outer, activeMenu]}>

                    {this.props.children}

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
    }

});
