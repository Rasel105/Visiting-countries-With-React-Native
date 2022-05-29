import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Country from './Country';


export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searched, setSearched] = useState([]);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/all`)
            .then(res => res.json())
            .then(data => {
                setCountries(data);
                setSearched(data);
                console.log(data);
            })
    }, [])

    const handleSearch = (text) => {
        const filtered = countries.filter(country => country.name.common.includes(text));
        setSearched(filtered);
    }

    return (
        <View>
            <Text style={styles.header}>Countries: {searched.length}</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                placeholder="Type what you want"
            ></TextInput>
            <ScrollView >
                {
                    searched.map(country => <Country country={country} />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 40,
        color: "red",
        textAlign: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },
})