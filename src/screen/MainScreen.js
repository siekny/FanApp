import {Alert, Animated, AppState, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import codePush from 'react-native-code-push';
import { Button, Text, ActionSheet, Content, Container, Root, View, Icon, Toast, Header, Left, Right, Body, Title } from 'native-base';
import { Easing } from 'react-native';
import {COLOR} from '../constants/Color';
import {OBJECT} from "../constants/Fan";

const MainScreen = () => {
    const [object, setObject] = useState(OBJECT[0])

    const BUTTONS = ["Default", "Blue", "Red", "Green", "Cancel"];
    const CANCEL_INDEX = 3;
    const animation = new Animated.Value(0);

    const codePushSync = () =>{
        codePush.sync({
            updateDialog: { //업데이트 다이얼로그 설정
                title : "새로운 업데이트가 존재합니다.",
                optionalUpdateMessage : "지금 업데이트하시겠습니까?",
                optionalIgnoreButtonLabel : "나중에",
                optionalInstallButtonLabel : "업데이트"
            },
            installMode: codePush.InstallMode.IMMEDIATE //즉시 업데이트
        });
    }

    useEffect(() => {
        // codePush.sync({
        //     updateDialog: true,
        //     installMode: codePush.InstallMode.IMMEDIATE,
        // });
        codePushSync();
        //앱이 켜졌을 때 마다 codePushSync() 실행해서 업데이트 체크한다.
        AppState.addEventListener("change", (state) => {
            state === "active" && codePushSync();
        });
    }, [])


    const handleFanIsOn = () => {
        animation.setValue(0);

        // Animated.loop(
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(o => {
            if (o.finished) {
                handleFanIsOn()
            }
        })
        // { iterations: 10}

        // ).start()
    }

    const handleFanWithTime = (time) => {
        animation.setValue(0);
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            {iterations: time * 60 * 1000/300}
        ).start();

    }

    const handleFanIsOff = () => {
        animation.stopAnimation();
    }

    const styleAnimations = {
        transform: [
            {rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };


    return (
        <Root>
            <Container>
                <Header style={{backgroundColor: object.COLOR}}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' style={{color:COLOR.WHITE}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:COLOR.WHITE}}>My Fan</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='heart' style={{color:COLOR.WHITE}} />
                        </Button>
                        <Button transparent
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: BUTTONS,
                                            cancelButtonIndex: CANCEL_INDEX,
                                            title: 'Change Color Fan',
                                        },
                                        buttonIndex => {
                                            setObject(OBJECT[buttonIndex])
                                        }
                                    )}>
                            <Icon name='settings' style={{color:COLOR.WHITE}} />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Animated.View style={[ styles.view, styleAnimations, { borderColor: object.COLOR}]}>
                        <Image style={styles.blade_fan}
                               source={{uri: object.BLADE}}
                        />
                    </Animated.View>
                    <Image style={styles.foot_fan}
                           source={{uri: object.FOOT}}
                    />

                    <View style={styles.buttonsFanView}>
                        <Button info rounded style={styles.buttonFan}
                                onPress={() => handleFanIsOn()}
                        >
                            <Text>On</Text>
                        </Button>

                        <Button light rounded style={styles.buttonFan}
                                onPress={() => handleFanIsOff()}
                        >
                            <Text>Off</Text>
                        </Button>

                        <Button danger rounded style={styles.buttonFan}
                                onPress={() => {
                                    Alert.prompt(
                                        "Set Sleep Timer",
                                        "",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () =>
                                                    Toast.show({
                                                        text: "You canceled to set the sleep timer.",
                                                        buttonText: "Okay",
                                                        duration: 3000,
                                                    }),
                                            },
                                            {
                                                text: "OK",
                                                onPress: password => handleFanWithTime(password),
                                                //  console.log("Your fan will be turned of in " + password + ' minutes')
                                            }
                                        ],
                                    )}}
                        >
                            <Text>Set Timer</Text>
                        </Button>
                        <Button>
                            <Text>Code Push</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        </Root>
    );
};

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE,
}

export default codePush(codePushOptions) (MainScreen);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dynamicColor: {
        backgroundColor: COLOR.BLACK,
    },

    foot_fan: {
        width: '80%',
        height: 150,
    },
    blade_fan: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    },

    setting: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
    },

    view: {
        width: 350,
        height: 350,
        borderRadius: 500,
        borderWidth: 3,
        borderColor: '#ccc',
        padding: 30,

    },
    buttonsFanView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonFan: {
        margin: 10,
    },
})
