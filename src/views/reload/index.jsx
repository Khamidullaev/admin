import { useEffect } from "react"
import { useHistory } from "react-router"


const Reload = () => {
  const history = useHistory()
  
  useEffect(() => {
    history.goBack()
  }, [])

  return null
}

export default Reload
