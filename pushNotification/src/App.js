import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {notificationManager} from './NotificationManager';


//
const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    button:{
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'grey',
        marginVertical: 10,
    }

});
//

const App =()=>{
    const [] = useState();
    let localNotify = null;
    const senderID = '853358851234';


    useEffect(() => {
        localNotify = notificationManager;
        localNotify.configure(
            onRegister,
            onOpenNotification,
            onNotification,
            senderID,
        );
    }, []);

    function onRegister(token) {
        console.log('[Notification] Registered: ', token);
    }

    function onNotification(notify) {
        console.log('[Notification] onNotification: ', notify);
    }

    function onOpenNotification(notify) {
        console.log('[Notification] onOpenNotification: ', notify);
        alert('Open notification!');
    }
    //
    function senNotify() {
        localNotify = notificationManager;
        localNotify.showNotification(
            1,
            'App notification -title',
            'Local notification.....',
            {}, // data
            {}, // options
        );
    }
    //
    function cancelNotify() {
        localNotify = notificationManager;
        localNotify.cancelAllLocalNotification();
    }


    return(
        <SafeAreaView>
        <View style={{alignItems:'center'}}>
            <Text>  PUSH NOTIFICATION </Text>
            <TouchableOpacity style={styles.button} onPress={senNotify}>
                <Text>{'Send notification'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={cancelNotify}>
                <Text>{'Cancel notification'}</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

export default App;
