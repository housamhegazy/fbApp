
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
              background:{
                default:"#001E3C",
                paper:"#001E3C",
              }
            }),
      },
  });
  
  export default getDesignTokens