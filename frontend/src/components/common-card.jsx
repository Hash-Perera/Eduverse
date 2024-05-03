import Card from "@mui/material/Card";

const CommonCard = ({ children, ...otherProps }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        boxShadow: "0px 0px 5px lightgray",
      }}
      {...otherProps}
    >
      {children}
    </Card>
  );
};

export default CommonCard;
