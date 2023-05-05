import { FlatList, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import arealist from './arealist.json';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const { width, height } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

type PrefTypes = Record<string, string>;

interface AreaTypes {
    type: string;
    values: Record<string, string> | Record<string, PrefTypes>;
}
  
type AreaArray = AreaTypes[];

export function AreaListPage() {
    const [openChildList, setOpenChildList] = React.useState('');

    const PressableListItem = (props) => {
        const { item, list } = props;
        return (
            <Pressable onPress={() => console.log(item)}>
                <Text style={styles.textStyle}>{list[item]}</Text>
            </Pressable> 
        )
    }

    const ExpandableList = (props) => {
        const { region, list } = props;
        const closeChildList = () => {
            if (openChildList == region) {
                setOpenChildList('');
            } else {
                setOpenChildList(region);
            }
        }

        return (
            <View style={styles.mainList}>
                <Pressable onPress={closeChildList}>
                    <Text style={styles.textStyle}>{region}</Text>
                    {(openChildList == region) && 
                        <FlatList 
                            data={Object.keys(list[region])} 
                            renderItem={
                                ({item}) => 
                                    <View style={styles.childList}>
                                        <PressableListItem item={item} list={list[region]}/>
                                    </View>
                            }
                        />
                    }
                </Pressable>
            </View>
        )
    }

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name={'高速道路'} 
                component={
                    () => 
                        <View>
                            <FlatList 
                                data={Object.keys(arealist[0]["values"])} 
                                renderItem={
                                    ({item}) => 
                                        <View style={styles.mainList}>
                                            <PressableListItem item={item} list={arealist[0]['values']}/>
                                        </View>
                                }
                                
                            />
                        </View>
                } 
            />
            <Tab.Screen
                name={'一般道路'}
                component={
                    () =>
                        <View>
                            <FlatList
                                data={Object.keys(arealist[1]["values"])}
                                renderItem={
                                    ({item}) => <ExpandableList region={item} list={arealist[1]['values']}/>    
                                }
                            />
                        </View>
                }
            />
        </Tab.Navigator>
    )
}


export const styles = StyleSheet.create({
    mainList: {
        padding:5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    childList: {
        height: height*0.05,
        margin: 5,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    textStyle: {
        color: 'black',
        fontSize: 18,
        height: height*0.05,
        
        textAlignVertical: 'center'
    },
});
