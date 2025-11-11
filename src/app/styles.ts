import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },

  button: {
    padding: 8,
  },

  resultContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  listContainer: {
    justifyContent: 'center',
  },

  card: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  digimonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  digimonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#585858ff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  digimonTypes: {
    fontSize: 14,
    color: '#585858ff',
    opacity: 0.8,
  },
});
