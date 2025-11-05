import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFF6D5',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 156,
    backgroundColor: '#88b5f0ff',
    borderRadius: 20,
    boxShadow: '#043779ff',
    elevation: 5
  },
  logo: {
    width: '100%',
    height: 155,
  },
   card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#004AAD', // azul Digimon
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004AAD',
  },
  level: {
    fontSize: 14,
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default styles;

