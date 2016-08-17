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
    Dimensions,
    ListView,
    Easing
} from 'react-native';

const _ = require('lodash');


const {height, width} = Dimensions.get('window');

const ITEMS_PER_ROW = 3

export default class Slidemenu extends Component {

    constructor(props){
        super(props)

        this.state = {
            active:false,
            cardAnimation: new Animated.Value(0),
            menuAnimation: new Animated.Value(0),
        }

        //our fake links to the app
        this.links = [
            'fab',
            'slide',
            'side',
            'Entries',
            'Search',
            'Logout',
        ]

    }

    componentDidMount(){
        this.handleMoveCard()
    }

    componentWillUpdate() {
        //want to keep this here to keep any animatons on state change
        //not needed now, maybe later
        LayoutAnimation.easeInEaseOut();
    }

    componentWillReceiveProps(nextProps){
        this.setState({active:nextProps.active}, this.handleMoveCardStart)
    }

    handleToggleMenu(selectedMenu){
        //sending state back to parent
        this.props.handleToggleMenu()
        this.props.handleChangeMenu(selectedMenu)
    }

    handleMoveCardStart(){
        this.setState({active:this.state.active}, ()=> this.handleMoveCard() )
    }

    handleMoveCard(){

        const menuAnimationOptions = {
            toValue: this.props.active ? 1 : 0,
            duration: this.props.active ? 400 : 100,
        }

        const cardAnimationOptions = {
            toValue: this.props.active ? -150 : 0,
            easing: Easing.elastic(1.3),
            duration: 350,
        }

        Animated.parallel([
            Animated.timing(this.state.menuAnimation, menuAnimationOptions),
            Animated.timing(this.state.cardAnimation, cardAnimationOptions),
        ]).start( ()=> this.handleMoveCardEnd() );

    }

    handleMoveCardEnd(){
        console.log('Done with animation')
        this.props.afterAnimation()
    }

    renderRow(links) {
        return links.map((name, i) => {
            return (
                <TouchableOpacity key={i} style={[styles.linkBlock]} onPress={()=> this.handleToggleMenu(name)} >
                    <Text style={styles.link}>{name}</Text>
                </TouchableOpacity>
            )
        })
    }

    renderItemsInGroupsOf(count) {
        return _.chunk(this.links, ITEMS_PER_ROW).map( (itemsForRow, i) => {
            return (
                <View style={styles.linkRow} key={i}>
                    {this.renderRow(itemsForRow)}
                </View>
            )
        })
    }

    renderMenu(){

        const menuStateStyles = {
            position:'absolute',
            opacity: this.state.menuAnimation,
            bottom: 20,
            left: 20,
            width: width - 40
        }

        return (
            <Animated.View  style={menuStateStyles}>
                <ScrollView onLayout={this.handleRotation} contentContainerStyle={styles.scrollView}>
                    {this.renderItemsInGroupsOf(ITEMS_PER_ROW)}
                </ScrollView>
            </Animated.View>
        )
    }

    render() {

        const cardAnimationStyle = {
            top: this.state.cardAnimation
        }

        return (
            <View style={styles.outer}>

                {this.renderMenu()}

                <Animated.View style={[styles.inner, cardAnimationStyle]}>
                    {this.props.children}
                </Animated.View>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    outer: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner:{
        flex: 1,
        elevation: 2,
        width: width, //setting the width of our main card
    },
    btn: {
        padding: 12,
        backgroundColor: 'white',
        margin:10,
        marginBottom:0,
        width:50,
        height:50,
        borderRadius: 40,
        elevation: 2
    },
    btnInner:{
        width:50,
        height:50
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    linkBlock:{
        flex:1,
        padding:10,
        borderRadius: 4,
        margin:5,
        alignItems: 'center',
        backgroundColor: '#5eba7d'
    },
    link:{
        fontSize:14,
        justifyContent: 'center',
        color: 'white'
    }

});
