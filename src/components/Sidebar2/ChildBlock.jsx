import { Collapse } from "@material-ui/core"
// import { Collapse } from "react-collapse"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const ChildBlock = ({ element, isVisible }) => {
  const { t } = useTranslation()

  // const transitions = useTransition(isVisible, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  //   reverse: isVisible,
  //   config: {
  //     duration: 200,
  //   },
  // })

  // return transitions(
  //   (styles, item) =>
  //     item && (
  //       <animated.div className="child-block" style={styles} >
  //         {element.children.map((childElement) => (
  //           <NavLink to={childElement.path} className="nav-element">
  //             <div className="label">{t(childElement.title)}</div>
  //           </NavLink>
  //         ))}
  //       </animated.div>
  //     )
  // )

  return (
    <Collapse
      in={isVisible}
      timeout={{
        enter: 300,
        exit: 200
      }}
    >
      <div className="child-block">
        {element.children.map((childElement) => (
          <NavLink to={childElement.path} className="nav-element">
            <div className="label">{t(childElement.title)}</div>
          </NavLink>
        ))}
      </div>
    </Collapse>
  )
}

export default ChildBlock
