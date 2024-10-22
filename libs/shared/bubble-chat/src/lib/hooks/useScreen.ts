
const useScreen = () => {

  const setActiveScreen = (screenId: string) => {
    localStorage.setItem('wicara-screen', screenId);
  }

  const getActiveScreen = () => {
    return localStorage.getItem('wicara-screen');
  }

  return {
    getActiveScreen,
    setActiveScreen,
  };
}

export default useScreen;
