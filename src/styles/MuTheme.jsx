
const getDesignTokens = (mode) => ({
    palette: {
        // @ts-ignore
        mode,
        ...(mode === "light"
          ? {
              // palette values for light mode
              housam: {
                main: "#64748B",
              },
              faveColor: {
                main: "rgb(247,247,247)",
              },
            }
          : {
              // palette values for dark mode
              housam: {
                main: "teal",
              },
              faveColor: {
                main: "null",
              },
            }),
      },
  });
  
  export default getDesignTokens