import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./index.scss";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Button({
  className,
  style,
  children,
  icon: Icon,
  color = "primary",
  loading = false,
  shape = "filled",
  borderWidth = 2,
  position = "left",
  size = "medium",
  borderType = "rounded",
  disabled = false,
  width,
  ...rest
}) {
  const classes = useStyles();

  // console.log(children);

  const getSize = (key) => {
    switch (key) {
      case "small":
        return {
          size: "h-6 px-2 py-0",
          fontSize: "text-sm",
          radius: "rounded",
        };
      case "medium":
        return {
          size: "h-8 px-3 py-1 min:w-7",
          fontSize: "text-sm",
          radius: "rounded-md",
        };
      case "large":
        return {
          size: "px-4 py-2",
          fontSize: "text-sm",
          radius: "rounded-md",
        };

      default:
        break;
    }
  };

  const getShape = (key) => {
    // console.log(key);
    switch (key) {
      case "filled":
        return {
          color: `bg-${color}-600 iconColor-filled hover:opacity-90 border-${borderWidth} border-${color}-600`,
          background: "",
        };
      case "outlined":
        return {
          color: `bg-transparent text-${color}-600 border-${borderWidth} border-${color}-600 hover:bg-background_2`,
        };
      case "text":
        return { color: `bg-transparent text-${color}-600 hover:opacity-90 border-${borderWidth} border-white` };

      default:
        return {
          color: `bg-${color}-600 iconColor-filled hover:opacity-90 border-${borderWidth} border-${color}-600`,
          background: "",
        };
    }
  };

  return (
    <div >
      <button
        disabled={disabled || loading}
        type="button"
        style={style}
        className={`
          button
          ${className}
          focus:outline-none
          transition
          ${children ? "" : "w-9 h-9"}
          focus:ring focus:border-blue-300 
          focus-within:z-40
          ${getShape(shape).color}
          ${getSize(size).size}
          ${borderType === "rectangle" ? "rounded-none" : getSize(size).radius}
          ${
            disabled || loading ? "disabled" : ""
          }
          text-white
        `}
        {...rest}
      >
        <div
          className={`flex items-center justify-center ${children ? "space-x-2" : ""} font-medium`}
        >
          {loading && <CircularProgress size={16} color="#fff" />}
          {Icon && position === "left" && <Icon style={{ fontSize: "18px" }} />}
          <div className={getSize(size).fontSize}>{children}</div>
          {Icon && position === "right" && <Icon style={{ fontSize: "18px" }} />}
        </div>
      </button>
    </div>
  );
}
