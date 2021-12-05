import { BrowserRouter, withRouter, HashRouter } from "react-router-dom";
import Root from "./Root.jsx";
import './App.scss';
import AppRouter from "./routes/index.jsx";
// import { TransitionGroup, CSSTransition } from "react-transition-group"

export default function App() {
  // const AnimatedSwitch = withRouter(({ location }) => (
  //   <TransitionGroup>
  //     {console.log(location)}
  //     <CSSTransition key={location.key} classNames="fade" timeout={1000}>
  //       <AppRouter />
  //     </CSSTransition>
  //   </TransitionGroup>
  // ))

  return (
    <HashRouter>
      {/* <AnimatedSwitch /> */}
      <AppRouter />
    </HashRouter>
  );
}
