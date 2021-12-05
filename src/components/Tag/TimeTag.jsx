import Tag from "./index"
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

export default function TimeTag ({ children }) {

  return (
    <Tag
      color="gray"
      shape="subtle"
      icon={QueryBuilderIcon}
      className="text-xs py-1.5 px-3 mt-2.5 w-20"
    >
      {children}
    </Tag>
  )
}