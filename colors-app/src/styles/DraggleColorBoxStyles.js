export default {
    root: {
      width: "20%",
      height: "25%",
      margin: "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      "&:hover svg":{
        color: "white",
        transform: "scale(1.7)"
      }
    },
    boxContent: {
      position: "absolute",
      width: "100%",
      left: "0px",
      bottom: "0",
      padding: "10px",
      color: "rgba(0,0,0,0.5)",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "12px",
      display: "flex",
      justifyContent: "space-between",
    },
    deleteIcon: {
      transition: "0.3s all ease-in-out"
    }
  };