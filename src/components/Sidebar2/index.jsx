import "./style.scss"
import menuElements from "./elements"
import MenuOpenIcon from "@material-ui/icons/MenuOpen"
import { useState, useEffect, useMemo } from "react"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import elements from "./elements"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import ChildBlock from "./ChildBlock"
import { useSelector } from "react-redux"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import LogoutModal from "./Modal"
import { useDispatch } from "react-redux"
import { CLEAR_ON_SIGNOUT } from "../../redux/constants"
import Logo from "../../assets/icons/logo.jpg"

const Sidebar = () => {
  console.log("MENU ELEMENT ==> ", menuElements)
  const { t } = useTranslation()
  const [openedBlock, setOpenedBlock] = useState(null)
  const [rightSideVisible, setRightSideVisible] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const login = useSelector((state) => state.auth.login)
  const permissions = useSelector(state => state.auth.permissions)
  const dispatch = useDispatch()

  const parentClickHandler = (element) => {
    if (element.children) {
      switchChildBlockHandler(element.id)
      if (!rightSideVisible) setRightSideVisible(true)
    } else setOpenedBlock(null)
  }

  const switchChildBlockHandler = (id) => {
    setOpenedBlock((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    if (!rightSideVisible) setOpenedBlock(null)
  }, [rightSideVisible])

  const logoutHandler = () => {
    setIsModalOpen(true)
  }

  const computedMenuElements = useMemo(() => {
    const result = []
    elements.forEach(element => {
      if(!element.children) {
        if(permissions.includes(element.permission)) result.push(element)
      }
      else {
        const childElements = []
        element.children.forEach(childElement => {
          if(permissions.includes(childElement.permission)) childElements.push(childElement)
        })
        if(childElements.length) result.push({
          ...element,
          children: childElements
        })
      }
    })
    return result
  }, [permissions])

  console.log("ELEMENTS ===>", computedMenuElements)

  return (
    <div className={`Sidebar ${!rightSideVisible ? "close" : ""}`}>
      <LogoutModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        logout={() => dispatch({ type: CLEAR_ON_SIGNOUT })}
      />
      <div className="header">
        <div className="brand">
          <div
            className="brand-logo"
            onClick={() => setRightSideVisible((prev) => !prev)}
            style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', transform: 'translateY(5px)' }}
          >
            <img src={Logo} alt="" />
          </div>
          <div className="brand-name">e-Space</div>
        </div>
        <div
          className="cloes-btn"
          onClick={() => setRightSideVisible((prev) => !prev)}
        >
          <MenuOpenIcon />
        </div>
      </div>

      <div className="nav-block" style={{height: `calc(100vh - ${72}px)`}} >
        <div className="menu-element">
          {computedMenuElements?.map((element) => (
            <div className="parent-block">
              <NavLink
                to={element.path}
                exact={false}
                activeClassName={
                  element.children ? "active-with-child" : "active"
                }
                className="nav-element"
                onClick={(e) => {
                  if (element.children) e.preventDefault()
                  parentClickHandler(element)
                }}
              >
                <div className="icon">
                  <element.icon />
                </div>

                <div className="label">{t(element.title)}</div>
                {element.children && (
                  <div
                    className={`arrow-icon ${
                      openedBlock === element.id ? "open" : ""
                    }`}
                  >
                    <ExpandMoreIcon />
                  </div>
                )}
              </NavLink>

              {element.children && (
                <ChildBlock
                  element={element}
                  isVisible={openedBlock === element.id}
                />
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="parent-block">
            <NavLink
              className="nav-element"
              to="/home/profile"
              style={{ padding: "10px 0px" }}
            >
              <div className="profile-avatar">{login[0].toUpperCase()}</div>
              <div className="label">Shaxsiy ma'lumotlar</div>
            </NavLink>
          </div>
          <div className="parent-block">
            <div className="nav-element" onClick={logoutHandler}>
              <div className="icon">
                <ExitToAppIcon />
              </div>
              <div className="label">Chiqish</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
