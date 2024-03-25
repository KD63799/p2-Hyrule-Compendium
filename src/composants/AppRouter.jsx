import Creatures  from "./Creatures/Creatures.jsx";
import CreaturesItem from "./Creatures/Creatures__item/CreaturesItem.jsx";
import Monsters  from "./Monsters/Monsters.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const AppRouter = () => {
    return (
        <div>
            <Router>
                    <Routes>
                        <Route path="/Monsters" element={<Monsters />} />
                        <Route path="/Creatures" element={<Creatures />} />
                        <Route path="/CreaturesItem/:id" element={<CreaturesItem />} />
                        {/* <Route path="/" element={<CreaturesItem name={name} />} /> */}
                        {/* <route path="/*" /> */}
                    </Routes>
            </Router>
        </div>
    );
};


export default AppRouter;