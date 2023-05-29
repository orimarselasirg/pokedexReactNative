import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, StyleProp, ViewStyle, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  style?: StyleProp<ViewStyle>
  onDebounce: (value: string) => void
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [input, setInput] = useState('');
  const {debouncedValue} = useDebounce(input);

  const closeKeyboard = () => Keyboard.dismiss();

  useEffect(()=>{
    onDebounce(debouncedValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedValue]);
  return (
    <View style= {{...styles.container, ...style as any}}>
      <View style={styles.textBackgroundColor}>
        <TextInput
          placeholder="Buscar pokemons"
          placeholderTextColor="grey"
          style={styles.inutText}
          autoCapitalize="none"
          autoCorrect={false}
          value={input}
          onChangeText={setInput}
          onBlur={closeKeyboard}
        />
        <Icon
          name="search-outline"
          color="grey"
          size={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    // backgroundColor: 'red',
  },
  textBackgroundColor: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inutText: {
    flex: 1,
    fontSize: 15,
    top: 2,
    // marginHorizontal: 20,
  },
});
